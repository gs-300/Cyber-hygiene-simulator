// scenarios.js
const scenarios = [
  {
    id: 1,
    type: "email",
    title: "Scenario 1: The Urgent Security Notice",
    interfaceLabel: "InBox Mail Client v4.2",
    meta: {
      from: '<span class="flag-target" data-flag="spoofedSender" tabindex="0">Netflix Support &lt;security-alert@netflx-billing-update.com&gt;</span>',
      to: "user@communitymail.org",
      subject: "URGENT: Your streaming subscription has been suspended"
    },
    body: `
      <p>Dear Valued Customer,</p>
      <p>We were unable to process your monthly payment details for this billing cycle. To prevent permanent suspension of your profile history and account access, you must verify your billing information within <span class="flag-target" data-flag="artificialUrgency" tabindex="0">24 hours</span>.</p>
      <p>Please click the secure link below to update your credit card details immediately:</p>
      <p style="text-align: center;">
        <a href="#" class="flag-target link-mock" data-flag="maliciousLink" onclick="return false;" tabindex="0">http://login.netflx-billing-update.com/auth/login</a>
      </p>
      <p>Thank you,<br>Customer Protection Team</p>
    `,
    explanations: {
      spoofedSender: "<strong>Lookalike Domain (Typosquatting):</strong> Notice the missing 'i' in 'netflx'. Attackers buy lookalike domain names to mimic trusted brands and bypass your initial suspicion.",
      artificialUrgency: "<strong>Artificial Urgency:</strong> Threatening a cutoff within '24 hours' is a social engineering tactic designed to induce panic, forcing the victim to act impulsively without verifying facts.",
      maliciousLink: "<strong>Suspicious Hyperlink:</strong> Hovering or inspecting this URL reveals it does not point to the official 'netflix.com'. It redirects to a harvesting page built to steal payment credentials."
    }
  },
  {
    id: 2,
    type: "sms",
    title: "Scenario 2: The Missing Package Alert",
    interfaceLabel: "Messages App",
    meta: {
      from: '<span class="flag-target" data-flag="unknownSender" tabindex="0">+1 (833) 492-0192</span>',
      to: "Me",
      subject: "SMS Text Message"
    },
    body: `
      <div class="sms-bubble">
        <p><strong>[USPS ALERT]</strong> Your package has been held at our local distribution center due to an incomplete delivery address.</p>
        <p>An administrative adjustment fee of $1.50 is required to schedule redelivery. Failure to act within <span class="flag-target" data-flag="smsUrgency" tabindex="0">12 hours</span> will result in the package being returned to sender.</p>
        <p>Update here: <a href="#" class="flag-target link-mock" data-flag="smsLink" onclick="return false;" tabindex="0">http://usps-post-redelivery.info/track</a></p>
      </div>
    `,
    explanations: {
      unknownSender: "<strong>Unverified Short Code / Phone Number:</strong> Official logistics entities like USPS generally send automated tracking operational alerts via verified 5-digit short codes, not unlisted 10-digit consumer phone numbers.",
      smsUrgency: "<strong>Coercive Fee / Time Limit:</strong> Attackers combine an incredibly low cost ($1.50) with an aggressive deadline to make the hurdle feel low enough to pay immediately without secondary confirmation.",
      smsLink: "<strong>Unofficial URL Structure:</strong> The official post office domain is 'usps.com'. This link uses 'usps-post-redelivery.info', a cheap, newly registered tracking domain mimicking authentic infrastructure."
    }
  }
];