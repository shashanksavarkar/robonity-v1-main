export const otpEmailTemplate = (otp) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>OTP Verification</title>
</head>
<body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f7fb;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 6px 20px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td align="center" style="background:#2563eb;padding:30px;">
              <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:700;">
                Verify Your Email
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:40px 35px;color:#333333;">
              <p style="margin:0 0 18px;font-size:16px;">
                Hello,
              </p>

              <p style="margin:0 0 24px;font-size:16px;line-height:1.6;">
                Use the One-Time Password (OTP) below to complete your RoboShare verification.
                This code is valid for <strong>10 minutes</strong>.
              </p>

              <!-- OTP -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <div style="
                      display:inline-block;
                      padding:18px 36px;
                      background:#f3f6ff;
                      border:2px dashed #2563eb;
                      border-radius:10px;
                      font-size:34px;
                      font-weight:bold;
                      letter-spacing:10px;
                      color:#2563eb;
                      font-family:Courier New, monospace;
                    ">
                      ${otp}
                    </div>
                  </td>
                </tr>
              </table>

              <p style="margin:30px 0 10px;font-size:15px;line-height:1.6;color:#555;">
                If you did not request this code, you can safely ignore this email.
                Never share your OTP with anyone.
              </p>

              <p style="margin:30px 0 0;font-size:15px;">
                Thanks,<br>
                <strong>Robonity RoboShare</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="background:#f8fafc;padding:20px;color:#888;font-size:13px;">
              © 2026 Robonity. All rights reserved.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
