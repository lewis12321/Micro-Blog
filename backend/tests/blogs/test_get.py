import uuid

import requests

from blogs import domain


def test_get():
    # Given
    payload = {"title": str(uuid.uuid4()), "description": "The best description", "markdown": "# The best title"}
    requests.post(f'https://{domain}/dev/api/blogs', json=payload)
    response = requests.get(f'https://{domain}/dev/api/blogs')
    value = next(filter(lambda i: i["title"] == payload["title"], list(response.json())))

    # When
    response = requests.get(f'https://{domain}/dev/api/blogs/{value["id"]}')

    # Then
    assert response.status_code == 200
    assert value["title"] == response.json()["title"]
    assert value["description"] == response.json()["description"]
    assert value["markdown"] == response.json()["markdown"]


def test_get_not_found():
    # Given
    blog_id = uuid.uuid4()

    # When
    response = requests.get(f'https://{domain}/dev/api/blogs/{blog_id}')

    # Then
    assert response.status_code == 404
