# SQ Cloud Integrations

**Connect SQ Cloud to popular AI frameworks**

---

## Overview

SQ Cloud's REST API works with any HTTP client. This guide shows integration patterns for popular AI development frameworks.

---

## LangChain

### Memory Backend

Use SQ Cloud as persistent memory for LangChain agents.

```python
import os
import requests
from langchain.memory import BaseMemory
from typing import Dict, List, Any

class SQCloudMemory(BaseMemory):
    """LangChain memory backed by SQ Cloud."""
    
    def __init__(self, instance_id: str, namespace: str = "langchain"):
        self.base_url = f"https://sq.mirrorborn.us/{instance_id}/api/v2"
        self.token = os.environ["SQ_TOKEN"]
        self.namespace = namespace
        self.session_id = self._new_session_id()
    
    @property
    def memory_variables(self) -> List[str]:
        return ["history"]
    
    def _coord(self, key: str) -> str:
        return f"{self.namespace}.{self.session_id}.{key}"
    
    def _new_session_id(self) -> str:
        from datetime import datetime
        return datetime.now().strftime("%Y%m%d%H%M%S")
    
    def load_memory_variables(self, inputs: Dict[str, Any]) -> Dict[str, Any]:
        resp = requests.get(f"{self.base_url}/read/{self._coord('history')}")
        if resp.status_code == 200:
            return {"history": resp.text}
        return {"history": ""}
    
    def save_context(self, inputs: Dict[str, Any], outputs: Dict[str, str]) -> None:
        current = self.load_memory_variables({}).get("history", "")
        new_entry = f"Human: {inputs.get('input', '')}\nAI: {outputs.get('output', '')}\n"
        updated = current + new_entry
        
        requests.put(
            f"{self.base_url}/write/{self._coord('history')}",
            headers={"Authorization": f"Bearer {self.token}"},
            data=updated
        )
    
    def clear(self) -> None:
        requests.delete(
            f"{self.base_url}/delete/{self._coord('history')}",
            headers={"Authorization": f"Bearer {self.token}"}
        )

# Usage
memory = SQCloudMemory(instance_id="abc123", namespace="myagent")
```

### Document Store

Store and retrieve documents by coordinate.

```python
from langchain.docstore.base import Docstore
from langchain.docstore.document import Document

class SQCloudDocstore(Docstore):
    """LangChain docstore backed by SQ Cloud."""
    
    def __init__(self, instance_id: str, namespace: str = "docs"):
        self.base_url = f"https://sq.mirrorborn.us/{instance_id}/api/v2"
        self.token = os.environ["SQ_TOKEN"]
        self.namespace = namespace
    
    def search(self, search: str) -> Document:
        # Use SQ Cloud's search endpoint
        resp = requests.get(
            f"{self.base_url}/search",
            params={"q": search, "namespace": self.namespace}
        )
        if resp.status_code == 200:
            results = resp.json().get("results", [])
            if results:
                return Document(page_content=results[0]["content"])
        raise ValueError(f"No document found for: {search}")
    
    def add(self, texts: Dict[str, Document]) -> None:
        for coord, doc in texts.items():
            requests.put(
                f"{self.base_url}/write/{self.namespace}.{coord}",
                headers={"Authorization": f"Bearer {self.token}"},
                data=doc.page_content
            )
```

---

## LlamaIndex

### Storage Context

Use SQ Cloud for LlamaIndex storage.

```python
import os
import json
import requests
from llama_index.core.storage.docstore import BaseDocumentStore
from llama_index.core.schema import BaseNode

class SQCloudDocumentStore(BaseDocumentStore):
    """LlamaIndex document store backed by SQ Cloud."""
    
    def __init__(self, instance_id: str, namespace: str = "llamaindex"):
        self.base_url = f"https://sq.mirrorborn.us/{instance_id}/api/v2"
        self.token = os.environ["SQ_TOKEN"]
        self.namespace = namespace
        self._docs: dict = {}
    
    def _coord(self, doc_id: str) -> str:
        # Sanitize doc_id for coordinate use
        safe_id = doc_id.replace("/", "-").replace(".", "_")[:20]
        return f"{self.namespace}.docs.{safe_id}"
    
    def add_documents(self, nodes: list[BaseNode], **kwargs) -> None:
        for node in nodes:
            data = json.dumps({
                "id": node.node_id,
                "text": node.get_content(),
                "metadata": node.metadata
            })
            requests.put(
                f"{self.base_url}/write/{self._coord(node.node_id)}",
                headers={
                    "Authorization": f"Bearer {self.token}",
                    "Content-Type": "application/json"
                },
                data=data
            )
    
    def get_document(self, doc_id: str, **kwargs) -> BaseNode | None:
        resp = requests.get(f"{self.base_url}/read/{self._coord(doc_id)}")
        if resp.status_code == 200:
            data = resp.json()
            from llama_index.core.schema import TextNode
            return TextNode(
                text=data["text"],
                id_=data["id"],
                metadata=data.get("metadata", {})
            )
        return None
```

---

## OpenClaw

OpenClaw natively supports SQ Cloud through the phext substrate.

### Agent Memory Hook

```yaml
# openclaw.json (excerpt)
{
  "hooks": {
    "entries": {
      "sq-memory": {
        "enabled": true,
        "type": "sq-cloud",
        "instance": "your-instance-id",
        "namespace": "agent.memory"
      }
    }
  }
}
```

### Direct API Access

```javascript
// In OpenClaw agent context
const SQ_BASE = 'https://sq.mirrorborn.us/abc123/api/v2';

// Read from phext coordinate
const context = await fetch(`${SQ_BASE}/read/memory.today.context`)
  .then(r => r.text());

// Write to phext coordinate
await fetch(`${SQ_BASE}/write/memory.today.summary`, {
  method: 'PUT',
  headers: { 
    'Authorization': `Bearer ${process.env.SQ_TOKEN}`,
    'Content-Type': 'text/plain'
  },
  body: sessionSummary
});
```

---

## AutoGPT / AgentGPT

### Plugin Pattern

```python
# sq_cloud_plugin.py
import os
import requests

class SQCloudPlugin:
    """AutoGPT plugin for SQ Cloud memory."""
    
    def __init__(self):
        self.base_url = f"https://sq.mirrorborn.us/{os.environ['SQ_INSTANCE']}/api/v2"
        self.token = os.environ["SQ_TOKEN"]
    
    def save_to_memory(self, key: str, value: str) -> str:
        """Save a value to persistent memory."""
        coord = f"autogpt.memory.{key}"
        resp = requests.put(
            f"{self.base_url}/write/{coord}",
            headers={"Authorization": f"Bearer {self.token}"},
            data=value
        )
        if resp.status_code in (200, 201):
            return f"Saved to {coord}"
        return f"Error: {resp.status_code}"
    
    def load_from_memory(self, key: str) -> str:
        """Load a value from persistent memory."""
        coord = f"autogpt.memory.{key}"
        resp = requests.get(f"{self.base_url}/read/{coord}")
        if resp.status_code == 200:
            return resp.text
        return ""
    
    def list_memory_keys(self) -> list[str]:
        """List all memory keys."""
        resp = requests.get(f"{self.base_url}/list/autogpt.memory.1")
        if resp.status_code == 200:
            return resp.json().get("coordinates", [])
        return []
```

---

## Generic Python Wrapper

### Minimal Client

```python
import os
import requests
from typing import Optional

class SQCloud:
    """Minimal SQ Cloud client."""
    
    def __init__(self, instance_id: str, token: Optional[str] = None):
        self.base_url = f"https://sq.mirrorborn.us/{instance_id}/api/v2"
        self.token = token or os.environ.get("SQ_TOKEN")
    
    def read(self, coord: str) -> Optional[str]:
        """Read scroll at coordinate."""
        resp = requests.get(f"{self.base_url}/read/{coord}")
        return resp.text if resp.status_code == 200 else None
    
    def write(self, coord: str, content: str) -> bool:
        """Write content to coordinate."""
        resp = requests.put(
            f"{self.base_url}/write/{coord}",
            headers={"Authorization": f"Bearer {self.token}"},
            data=content
        )
        return resp.status_code in (200, 201)
    
    def delete(self, coord: str) -> bool:
        """Delete scroll at coordinate."""
        resp = requests.delete(
            f"{self.base_url}/delete/{coord}",
            headers={"Authorization": f"Bearer {self.token}"}
        )
        return resp.status_code == 200
    
    def list(self, coord: str) -> list[str]:
        """List children of coordinate."""
        resp = requests.get(f"{self.base_url}/list/{coord}")
        return resp.json().get("coordinates", []) if resp.ok else []
    
    def search(self, query: str, limit: int = 10) -> list[dict]:
        """Full-text search."""
        resp = requests.get(
            f"{self.base_url}/search",
            params={"q": query, "limit": limit}
        )
        return resp.json().get("results", []) if resp.ok else []

# Usage
sq = SQCloud("abc123")
sq.write("notes.today.1", "Remember to check CI results")
content = sq.read("notes.today.1")
```

---

## Node.js / TypeScript

```typescript
import fetch from 'node-fetch';

interface SQCloudConfig {
  instanceId: string;
  token?: string;
}

class SQCloud {
  private baseUrl: string;
  private token: string;

  constructor({ instanceId, token }: SQCloudConfig) {
    this.baseUrl = `https://sq.mirrorborn.us/${instanceId}/api/v2`;
    this.token = token || process.env.SQ_TOKEN || '';
  }

  async read(coord: string): Promise<string | null> {
    const resp = await fetch(`${this.baseUrl}/read/${coord}`);
    return resp.ok ? resp.text() : null;
  }

  async write(coord: string, content: string): Promise<boolean> {
    const resp = await fetch(`${this.baseUrl}/write/${coord}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'text/plain',
      },
      body: content,
    });
    return resp.ok;
  }

  async list(coord: string): Promise<string[]> {
    const resp = await fetch(`${this.baseUrl}/list/${coord}`);
    if (!resp.ok) return [];
    const data = await resp.json();
    return data.coordinates || [];
  }
}

// Usage
const sq = new SQCloud({ instanceId: 'abc123' });
await sq.write('agents.node.state', JSON.stringify({ task: 'review PR' }));
```

---

## Related Resources

- **[API Reference](./api-reference.md)** — Complete REST API documentation
- **[SDK Reference](./sdk-reference.md)** — Python, Go, TypeScript SDK details
- **[Cookbook](./cookbook.md)** — Practical recipes for common patterns
- **[Best Practices](./best-practices.md)** — Coordinate naming, performance tips
- **[Use Cases](./use-cases.md)** — Real-world application examples
- **[Troubleshooting](./troubleshooting.md)** — Common issues and solutions

---

*✴️ Lumen | Integration patterns for SQ Cloud*
