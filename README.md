# fastapi\_swagger\_custom

**Personalize the FastAPI Swagger UI easily.**

---

## Features

- Customizable Swagger documentation for FastAPI projects.
- Quick setup—just install, import, and mount!

---

## Installation

1. [Download the wheel file](https://github.com/arita89/fastapi_swagger_custom/releases/tag/first) from the [releases page](link-to-releases).
2. Place the `.whl` file in the root of your repository.
3. Install it locally:
   ```bash
   pip install ./fastapi_swagger_custom-*.whl
   ```

---

## Usage

Import and mount the custom Swagger docs in your FastAPI app:

```python
from fastapi import FastAPI
from fastapi_swagger_custom import mount_swagger_docs

app = FastAPI(docs_url=None, redoc_url=None)
mount_swagger_docs(app)

@app.get("/")
def root():
    return {"msg": "Success!"}

@app.get("/fail")
def fail():
    from fastapi import HTTPException
    raise HTTPException(status_code=400, detail="This always fails")
```

---

## Notes

- Make sure to disable the default docs (`docs_url=None, redoc_url=None`) to avoid conflicts.
- Further customization options may be available—see the source or future documentation.

---

