from unittest.mock import patch
from app import create_app

app= create_app()
client = app.test_client()

def test_prompt():
    with patch("app.routes.build_prompt", return_value="fake optimized prompt"):
        response = client.post("/optimize", json={"user_input": "write a coverletter"})
        assert response.status_code == 200
        assert "optimized_prompt" in response.get_json()
def test_empty():
    with patch("app.routes.build_prompt", return_value="fake optimized prompt"):
        response = client.post("/optimize", json = {"user_input": ""})
        assert response.status_code == 400
def test_user():
    with patch("app.routes.build_prompt", return_value="fake optimized prompt"):
        response = client.post("/optimize", json = {"": "hi there"})
        assert response.status_code == 400
    

        

