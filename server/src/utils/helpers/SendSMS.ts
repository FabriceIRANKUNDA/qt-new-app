import axios, { AxiosResponse } from 'axios'
import qs from 'qs'
import config from '../../config'

class SendSMS {
  private to: string
  private from: string
  private url: string
  private code: string

  constructor(recepient: { phone: string }, code: string, url: string) {
    this.to = recepient.phone
    this.from = config.SMS_SENDER
    this.url = url
    this.code = code
  }

  async send(message: string): Promise<AxiosResponse | any> {
    const data = qs.stringify({
      message,
      sender: this.from,
      recipients: this.to,
    })

    const payload = {
      method: 'post',
      url: this.url,
      headers: {
        Authorization: `Basic ${config.SMS_BASIC_AUTH}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data,
    }

    try {
      const res = await axios(payload as any)
      return res.data
    } catch (error) {
      return error
    }
  }

  async sendOtpCodeSMS(): Promise<AxiosResponse | any> {
    const message = `
        Ubusabe byo guhindura ijambo banga bwemejwe koresha ${this.code}.
      `
    return await this.send(message)
  }
}

export default SendSMS
