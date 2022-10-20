// Base_url(change) = http://65.1.71.77:8081/apisrtest/

// 1.	Login
URL: -  /auth/login

Req: -
    {
        "mobile": "9887768837"
    }

Res: -
    {
        "message": "OTP send"
    }

// 2. Verify OTP
URL: - /apisrtest/auth / verifyotp

Req: -
    {
        "mobile": "9887768837",
        "otp": "123456"
    }

Res: -
    {
        "jwt": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyMDIyMTAxNDc4ODczNzY5ODgiLCJpYXQiOjE2NjYyNjYyNzgsImV4cCI6MTY2NjM1MjY3OH0.QnDM4F_z4Ny2NwORMevLFjlAEfwJ3ASW8MAaEgUpOK-bByg3fOmi2xnHLrrSLpK7Y-HdbmLmjhqIBgYoFunxkw",
        "id": "202210147887376988",
        "verifyStatus": "NEW",
        "jwtRefresh": "aAoVvj4jqTzwYyygzSlW3iPq1FegCEcQuu3y8uY5fvXFIVb5TRnWdci3VnHsUkjS3RpzNZxJT49UiCxhHGB8d1UeWwVCgmsjqUQwRaZaxvvxIPX7IyfO0zUGsojcfOpB202210147887376988",
        "currentStatus": "OLD"
    }

// 3. Update profile
URL: - v1 / profile / updateprofile
Req: -
    {
        "userEmail": "abc@gmail.com",
        "firstName": "Sumit",
        "lastName": "Singh",
        "gender": "Male",
        "dematNo": "asdasf123",
        "userDob": "1993-05-05"
    }
Res: -
    {
        "status": "SUCCESS",
        "data": null,
        "error": {}
    }

// 4. Get user Profile
URL: - v1 / profile / getprofile
Req: - empty
Res: -
    {
        "status": "SUCCESS",
        "data": {
            "userMobile": "9887768837",
            "userEmail": "abc@gmail.com",
            "isVerified": "VERIFIED",
            "firstName": "Sumit",
            "lastName": "Singh",
            "gender": "Male",
            "dematNo": "asdasf123",
            "userDob": "1993-05-05",
            "active": false
        },
        "error": {}
    }

// 5.  All product get

URL: v1 / product / getproduct

Req: -
    {
        "offset": 1
    }

Res: -

    {
        "status": "SUCCESS",
        "data": [
            {
                "proId": "07dafa30-56e7-4891-8b3b-ad71253f545b",
                "couponsRate": 11.95,
                "ratingShort": "A+",
                "ratingDesc": "A+ by CARE",
                "faceValue": 100000,
                "quantum": 100000,
                "yieldPrice": 11.7,
                "secName": "Ujjivan Small Finance Bank Ltd",
                "cateName": "Private Bonds",
                "ipTypeName": "Monthly",
                "tenure": null,
                "productMainMaturityIpModel": [
                    {
                        "maturityDate": "2028-05-28",
                        "maturityPer": null,
                        "ipDateDigit": "26",
                        "ipDateText": "26th of Every Month"
                    }
                ]
            },
            {
                "proId": "b2c691e0-1a30-412c-8699-04220448663c",
                "couponsRate": 11.9,
                "ratingShort": "A+",
                "ratingDesc": "A+ by CRISIL",
                "faceValue": 100000,
                "quantum": 100000,
                "yieldPrice": 10.9,
                "secName": "Svatantra Micro Finance Ltd Pvt Ltd",
                "cateName": "Private Bonds",
                "ipTypeName": "Quarterly",
                "tenure": null,
                "productMainMaturityIpModel": [
                    {
                        "maturityDate": "2028-06-15",
                        "maturityPer": null,
                        "ipDateDigit": "09-15/12-15/03-15/06-15",
                        "ipDateText": "15th Sep/15th Dec/15th\nMar/15th Jun"
                    }
                ]
            }
        ],
        "error": null
    }

// 6.  Get user Orders

URL: - /v1/order / getorder

Req: empty

Res: -
    {
        "status": "SUCCESS",
        "data": [
            {
                "orderId": "1318b8e7-75e4-4c04-abdf-e770753a0825",
                "ordQuantity": 1,
                "ordAmt": 100000,
                "ordStatus": "PROCESS",
                "ordDatetime": "2022-10-20 12:40:11.773296",
                "payMode": null,
                "yieldPrice": 10.9,
                "secName": "Svatantra Micro Finance Ltd Pvt Ltd",
                "orderUserStatus": [
                    {
                        "orderStatus": "PROCESS",
                        "orderDate": "2022-10-20 12:40:11.773296"
                    }
                ]
            }
        ],
        "error": null
    }
