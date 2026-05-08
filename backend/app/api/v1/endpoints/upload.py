from fastapi import APIRouter, UploadFile, File

router = APIRouter()

@router.post("/")
async def upload_file(file: UploadFile = File(...)):
    return {"filename": file.filename, "message": "File uploaded successfully"}

@router.get("/files")
async def list_files():
    return []

@router.delete("/files/{id}")
async def delete_file(id: str):
    return {"message": f"File {id} deleted"}
