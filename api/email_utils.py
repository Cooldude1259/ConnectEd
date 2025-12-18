import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def send_custom_mail(receiver_email, magic_link):
    sender_email = os.environ.get("SENDER_EMAIL")
    # This is the 16-character 'App Password' from Google
    app_password = os.environ.get("SENDER_APP_PASSWORD") 

    message = MIMEMultipart()
    message["From"] = f"My App <{sender_email}>"
    message["To"] = receiver_email
    message["Subject"] = "Your Temporary Login Link"

    body = f"Click here to verify your account: {magic_link}\n\nThis link expires in 15 minutes."
    message.attach(MIMEText(body, "plain"))

    try:
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()  # Upgrade the connection to secure
            server.login(sender_email, app_password)
            server.sendmail(sender_email, receiver_email, message.as_string())
        return True
    except Exception as e:
        print(f"SMTP Error: {e}")
        return False