export class ClothingAPI {
  constructor() {
    this.baseURL = "http://localhost:3001";
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  getClothing() {
    return this._request(this.baseURL + "/items", { method: "GET" });
  }

  addNewItem(item) {
    return this._request(this.baseURL + "/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        name: item.name,
        weather: item.weather,
        imageUrl: item.imageUrl,
      }),
    });
  }

  deleteItem(item) {
    return this._request(this.baseURL + `/items/${item._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
  }
}
