from setuptools import setup, find_packages

setup(
    name="fastapi_swagger_custom",
    version="0.1.0",
    packages=find_packages(),
    include_package_data=True,  # <-- MUST be here!
    install_requires=["fastapi"],
    description="Custom FastAPI Swagger UI",
)
