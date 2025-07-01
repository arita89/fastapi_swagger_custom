# fastapi_swagger_custom
personalization of the fastapi swagger

# how to use:
- get the wheel from the release
- place the file in the root of your repo
- import and use as in the following example

'''
from fastapi import FastAPI
from fastapi_swagger_custom import (
    mount_swagger_docs,
)

app = FastAPI(docs_url=None, redoc_url=None)

mount_swagger_docs(app)


@app.get("/")
def root():
    return {"msg": "Success!"}


@app.get("/fail")
def fail():
    from fastapi import HTTPException

    raise HTTPException(status_code=400, detail="This always fails")
'''
