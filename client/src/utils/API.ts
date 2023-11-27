import axios from "axios";

class API {
  private static baseUrl: string = process.env.REACT_APP_API_URL as string;
  static async getLogin(url: string) {
    try {
      const res = await axios({
        method: "GET",
        url: this.baseUrl + url,
      });
      return res;
    } catch (err: any) {
      return err;
    }
  }
  static async auth(url: string, data: object) {
    try {
      const res = await axios({
        method: "POST",
        url: this.baseUrl + url,
        data,
      });
      return res;
    } catch (err: any) {
      return err;
    }
  }

  static async getLogout(url: string) {
    try {
      const res = await axios({
        method: "GET",
        url: this.baseUrl + url,
      });
      return res;
    } catch (err: any) {
      return err;
    }
  }
  static async get(url: string, token?: string, headers = {}) {
    try {
      const res = await axios({
        method: "GET",
        url: this.baseUrl + url,
        headers: {
          Authorization: `Bearer ${token}`,
          ...headers,
        },
      });
      return res;
    } catch (err: any) {
      return err;
    }
  }

  static async post(url: string, data: any, token?: string) {
    try {
      const res = await axios({
        method: "POST",
        url: this.baseUrl + url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data,
      });

      return res;
    } catch (err: any) {
      console.log(err.response?.data?.message);
      return err;
    }
  }

  static async delete(url: string, token: string) {
    try {
      const res = await axios({
        method: "DELETE",
        url: this.baseUrl + url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res;
    } catch (err: any) {
      console.log(err.response);
      return err;
    }
  }

  static async update(url: string, data: any, token: string) {
    try {
      const res = await axios({
        method: "PATCH",
        url: this.baseUrl + url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data,
      });

      return res;
    } catch (err: any) {
      return err;
    }
  }
}

export default API;
