import os
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles


def mount_swagger_docs(app, mount_path="/static", docs_path="/docs"):
    static_dir = os.path.join(os.path.dirname(__file__), "static")
    app.mount(mount_path, StaticFiles(directory=static_dir), name="static")

    @app.get(docs_path, include_in_schema=False)
    def custom_swagger_ui():
        html_path = os.path.join(static_dir, "custom_swagger.html")
        try:
            if os.path.exists(html_path):
                with open(html_path, encoding="utf-8") as f:
                    html_content = f.read()
                return HTMLResponse(html_content)
            else:
                return RedirectResponse(url="/default-docs")
        except Exception:
            return RedirectResponse(url="/default-docs")
