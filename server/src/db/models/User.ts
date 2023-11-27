import mongoose from 'mongoose'
import { IUser } from '../../utils/types'
import validator from 'validator'

const userSchema = new mongoose.Schema<IUser>(
  {
    names: {
      type: String,
      required: [true, 'Please tell us your name!'],
      maxlength: [50, 'Name must contain atmost only 50 characters!.'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Please provide your phone number'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    photo: {
      type: String,
      default:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH0AAAB9CAMAAAC4XpwXAAAAaVBMVEUAAAD////u7u7t7e319fX4+Pjv7+/7+/vy8vLR0dGIiIjMzMza2tp+fn48PDzp6el2dnZKSko0NDS+vr5QUFCSkpJiYmKwsLClpaXFxcVsbGxDQ0NcXFwcHBwPDw8VFRUsLCwjIyObm5szDgmyAAALBUlEQVRogb1baaOyKhAWWTXLykxbTtv//5EXhAFEsOw9584nU5knhplhFsyQIpbnOabqimJ5KdxNrq6Id5MiUTSv9WGzeewlbTa7w/W8bV9NIUZjAka5ZqQek+Gmepxny9Dxqd39ZHG678umIlTMoItv0RlHdXd8JJDtPzi0VY5+e+6C1P3xDTLQ7lUvnDuWZNAlseFmri6HQYivzh9Ca7o2kr1lhC0joa6Iu5kxRXqG6mp4xNWV0O8zhnD3XIQ9UM8sI2QYMaYn6G5mSgAYweri4S5XN/X/FrRuU2o2Tz8t0/I1jPBocVkMPScBOn49Ipzvm8O21LTenq+XS+yl7NEz4tDz5ejdfjqna3uqcjEwkq9yTgkldXFqr9P12TSU4Tn0YfUNuiQteXUlDac+hOye7Yoaw+HjMYhysXrtwgFXzEHyEcXOqCKiiI4vEWrDmfTSlOjozfEY+YdIF/7jHrk3Q5yoxQ2TqS5jga8rayhuMsSKylgpI7Raj9X0WkkJ5XGL0+hTb9PdfQ77vtaWPzgJt5ChkrJhdN2O1OXZ8IW+rh8N7xk1FvoButII8Rqp4Iuyz30dQdvRWEJz0K13krdujYy05kyDMRJdST7QhuFC+JqzpSh47l1Fb2q1Qsz3znuMImNiFkc8fducONNSATMEUYUWF5FK4y3/U+nexOKm3oZt3Jh1TUAjOB6tbh7GHY6RW13sreBNwr/3ddgD7zwX9Q06Ip72/sjQYx4dU+HEfq/8zYE7dWfYjzuwswaQvLUGzIv7iJ9BB8kLRVS6a07kBRFu5geB9E39mA5vqivuxkjlkYPcTQ6M9E05xlfhW43gsX7T2rtWCe4c9Vaw3OqWs7gcmxnKiVWSaqr2bpjMOKrUY6hb/D1jnr3j0Nu46GnNRSymBfHXnQxrf2632/NyKJuakBi6GUPWlutV7nlJX+c8xDkRUeur0/GW+XQ/NzSNzpCz/JYm0TsfPEC3kheo2WRTejRW8Sfo2INv6ARdBV05KtyaD4PUzSDiQzkvYtiKNoU/huY2elOBo1v7Sm9X6jHL3L8l1jMdJYtJQMT1ZMJN36eWujHEjhkYUatRO5pbqXj2bnVjL0QkHFOcBJ6PrI8ihY7yB7xUKqmH3sbJvUZ5HF3Uk8gpoANOodPKyV5M0a3cu1FE7aGzPLXkjjYigS6odboXPokq7bNyup0ZdPoeXMJPdn5gxO3S9hQ8rf5jooZYbCf87AMCInlF0GfZ1BkFOs8hXbJe/AdL8Q46r/8Ytf+rIPEcFtMuARdSh0J7hy1xBa+UY3uvYCcqaR5HF/UtgRbSvU6h24Dtp/bRrbXdBEug08+z2G0SXcArax/dWkODXKg0ip/I6WNwuXookYpzq9vVcDOTsZ1zYHtEzK4tSe/V6rncytF1AfoREdjfA0YIAu0SDfu7MgkrkIaYDNoaCqRfVQIoThWbxNqGkVVdAt6GwK0Ln6QH4G3KRegtn3obwwisrgd0CqFcQ5Loy6oXT5qn0GGmG+PrBHj4iwgyaCewIoWToIIlJI8ITF6FmFLrOEi1R6nkBL0Wor94KsuxLr2UyY20OAH7C0Z+Bu1bHFlWslJa7zFyFicFwGrzyl5n0OD/Yk7CoNNLCiZBl3S9joDDWwnlbcDPndLobCF4lvEkuoDZllyiWzVAgG4l7yLExegkYAS1CxVMmA3joubuBG8zFuJSEp2x1EmUFAnqJzR+uiSs7yhIRkCdO+6qhUGFgi+fe9LbyJuwZfQo45BmYSer0Nv8LjoFx36V9m6Cmn28VqkHiSTKN+gw4R+egRdbJ+q0wyCyGJ3NoFPYUosM/G4T1qgZ1KgZo/zTuAboSSPFbqhRkwYwM/s/zKM8YqaEv4vjQzp4jLhixGy9Ti4uyPuVGV/zqPOZ3gTdJnHitE34Ol3VAN++zkzMshFz6KRPA0Wpn+2MQGJwzMzfONO5vgxbvMPOzh3CtEtmwoY1n0PPxbL+xJ37jHKnQCbHMgv5zEwg36b7MoOqLttizyhkxP2+DGxsd0DvUn0ZY6ZNGipCjZh6G68vA/HMPTOWfEr0ZQBdPBaAP2s25+swDUsQxRv0RUGt3Lnn0cNArYr1ZZCXQS8J6As2rZ37fZkJekG8zTjc39XVgjzujEaMwv2dcBS6j0I4i5vENqpWSVZRpBitAkY5Du09RD+ROXtXN+mnXeAjijAad4FDyTdv0cmn4VWVRgdvY3XeWFxvPW08g1Y3P1P7kvKA0SieH/SxBGzjbUpE3hElnyRzD0LfcnK+zjjwdcLinKHIjeATh3dKdKt8i4O66U/20BfXd95GcfpA9q2nW0lvQ8we98hMhLeh79Hl03d6v0UfoOdQOjtAbPOsw10GJO+jMzZfMDyMrDq5y9RG4Gsb150QCbxT2IIZHuPHDPieoUlfJsbIxXUQ0/bircUNU6jTsz9gz7iiNSujj6C9nY3nt/yjs0ZY4FT1SvVa35w1MhphE7mMG5P7oe88rUaXsXG8kNGbMdrZzPo6o+lPmsGl6Vgk0BkXq22JdHmVVpMTEdlB+1f538rziifnPugjZEZXnlmf2+u/bA/D6EhMlxhp1arqxZkMjReGaDPG33WEmuhXOZLLq9IRYchoCB05LPuLZgLy2SPKY/aOGREN7O3XWk+GEVKUT7NFPLfqJIgejcEhHIcWWdTebbGkQFmOoWhEWSSqJAi33hmIWwWilI/r06lrTqbHpNCR13TN7q0YnfZx6OaFDZHoNkvqSGTuq9C7taOFVFKFTp2YBItSA8gUHYS9VbVKm1EeSTh33kzVK7usdDIY9gnpKpJq7hrokTp0mO1JobMaxFULmLtqx5FQtSxtK8kSen6g2VUi0Tw0xKIPVgt1kCfTfRkY1w46P/hGJaAEthYpRTrW1NMmp5mY89BwYjIjOcSW6NfyR+YthOpmQTBYvanHP9ZdVeMay3WvuvVj/uVDgRjYu92nVsT0JkDrO4PO83WK0Ze01aZKsK3G75XyDOjgOjcDOuPfnOZ7Q89Oz53D1F8W3fUmJLpgS0vCn5F0lEhYA8uw2kKHcxfW++yld6k+6Th+Q5tKbqOwyGvdlxlM2yZpp8V9gCVUuERcb0qmCwxGd1iWpy+lBirtW+SjV0sLcv9Gt8p0/00P+rdNbJ7W1D/ZSGn93bHV7+he8/HJRrq0IvcvpAKZQeb2xAtf2nr5noZW3Pi8jfhLUxtTFaKrw1PLmp3fU4kMOs4zr0Tz/8h+Q11u451s5P+P7AsvrfZP9318suJfqEueLaR/v/Rl+mQjI0t7EEtpxyPokGQJ/Lcu7wePIlEUniVedsJhKakztXOnuFHxd7vdreK2qpE4xU1WfwV/W31whpx+XpBdRoVf0RmddPLQMf0b4RfIJF6unpRnsdOT1e9r/r2iti/jTlxGv5eJfK7xj3Rg1KuYxb2NzaCF+N1Iq+SffS9jMmjG+99b/FsXqFYK3Z41wulzs0tpXwyKPZI87HHhEQtbZ0S/tOeUlIZ9GVvFtLFNPu3L/EZSdan8Tmjc3uNf52FBXv+WzT6ghPjVl4mM1uX32ncrazRGT3har3EwrhJL21/a+QfaVjzVl0Gwx739AIby6hv1ays0PWMWco9/oTY62aj6BP2yeHfX6Qkm+jLRqHK2M1KV0w/14nRpK0KSZwsXfZnoFThxUb6VwO0godUXF7NdIYf+XvK2IyaoKPpj2gaf564a69ZbyXvfVb357EqfcZRrcOrbdn08XDYb9R305rI7nNdtf6rUV5KJrwbjnx/S/wAViZgHH6YTJQAAAABJRU5ErkJggg==',
    },
    role: {
      type: String,
      default: 'assignees',
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [8, 'Password must contain at least 8 characters.'],
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, 'Please confirm your password'],
      minlength: [8, 'Password must contain at least 8 characters.'],
    },
    isPasswordResetTokenVerified: { type: Boolean, default: false },
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

export const User = mongoose.model<IUser>('User', userSchema)
