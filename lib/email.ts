import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail({
  email,
  tempPassword,
}: {
  email: string;
  tempPassword: string;
}) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;

  await resend.emails.send({
    from: "Outraro <hello@outraro.com>",
    to: email,
    subject: "Welcome to Outraro – Your login is ready",
    html: `
      <div style="font-family:Inter,sans-serif;max-width:480px;margin:0 auto;padding:40px 20px;">
        <div style="text-align:center;margin-bottom:32px;">
          <div style="display:inline-block;background:#4f46e5;border-radius:8px;padding:8px;margin-bottom:12px;">
            <span style="color:white;font-size:20px;">&#9889;</span>
          </div>
          <h1 style="color:#111827;font-size:24px;margin:0;">Welcome to Outraro</h1>
        </div>
        <p style="color:#374151;font-size:16px;line-height:1.6;">Your membership is active. Here are your login credentials:</p>
        <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:20px;margin:24px 0;">
          <p style="color:#6b7280;font-size:14px;margin:0 0 8px;">Email</p>
          <p style="color:#111827;font-size:16px;font-weight:600;margin:0 0 16px;">${email}</p>
          <p style="color:#6b7280;font-size:14px;margin:0 0 8px;">Temporary Password</p>
          <p style="color:#111827;font-size:16px;font-weight:600;margin:0;">${tempPassword}</p>
        </div>
        <a href="${appUrl}/login" style="display:block;text-align:center;background:#4f46e5;color:white;font-weight:600;padding:14px 24px;border-radius:12px;text-decoration:none;font-size:16px;margin:24px 0;">Log In to Your Dashboard</a>
        <p style="color:#9ca3af;font-size:13px;text-align:center;margin-top:32px;">We recommend changing your password after your first login.</p>
      </div>
    `,
  });
}
