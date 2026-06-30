// scenarios.js
const scenarios = [
  {
    id: 1,
    type: "email",
    interfaceLabel: {
      en: "InBox Mail Client v4.2",
      es: "Cliente de Correo InBox v4.2"
    },
    title: {
      en: "Scenario 1: The Urgent Security Notice",
      es: "Escenario 1: El Aviso de Seguridad Urgente"
    },
    meta: {
      from: {
        en: '<span class="flag-target" data-flag="spoofedSender" tabindex="0">Netflix Support &lt;security-alert@netflx-billing-update.com&gt;</span>',
        es: '<span class="flag-target" data-flag="spoofedSender" tabindex="0">Soporte de Netflix &lt;security-alert@netflx-billing-update.com&gt;</span>'
      },
      to: "user@communitymail.org",
      subject: {
        en: "URGENT: Your streaming subscription has been suspended",
        es: "URGENTE: Su suscripción de streaming ha sido suspendida"
      }
    },
    body: {
      en: `
        <p>Dear Valued Customer,</p>
        <p>We were unable to process your monthly payment details for this billing cycle. To prevent permanent suspension of your profile history and account access, you must verify your billing information within <span class="flag-target" data-flag="artificialUrgency" tabindex="0">24 hours</span>.</p>
        <p>Please click the secure link below to update your credit card details immediately:</p>
        <p style="text-align: center;">
          <a href="#" class="flag-target link-mock" data-flag="maliciousLink" onclick="return false;" tabindex="0">http://login.netflx-billing-update.com/auth/login</a>
        </p>
        <p>Thank you,<br>Customer Protection Team</p>
      `,
      es: `
        <p>Estimado Cliente,</p>
        <p>No hemos podido procesar los detalles de su pago mensual para este ciclo de facturación. Para evitar la suspensión permanente del historial de su perfil y el acceso a la cuenta, debe verificar su información de facturación dentro de <span class="flag-target" data-flag="artificialUrgency" tabindex="0">24 horas</span>.</p>
        <p>Haga clic en el enlace seguro a continuación para actualizar los detalles de su tarjeta de crédito de inmediato:</p>
        <p style="text-align: center;">
          <a href="#" class="flag-target link-mock" data-flag="maliciousLink" onclick="return false;" tabindex="0">http://login.netflx-billing-update.com/auth/login</a>
        </p>
        <p>Gracias,<br>Equipo de Protección al Cliente</p>
      `
    },
    explanations: {
      spoofedSender: {
        en: "<strong>Lookalike Domain (Typosquatting):</strong> Notice the missing 'i' in 'netflx'. Attackers buy lookalike domain names to mimic trusted brands and bypass your initial suspicion.",
        es: "<strong>Dominio Imitado (Typosquatting):</strong> Observe la falta de la 'i' en 'netflx'. Los atacantes compran nombres de dominio similares para imitar marcas de confianza y evadir su sospecha inicial."
      },
      artificialUrgency: {
        en: "<strong>Artificial Urgency:</strong> Threatening a cutoff within '24 hours' is a social engineering tactic designed to induce panic, forcing the victim to act impulsively without verifying facts.",
        es: "<strong>Urgencia Artificial:</strong> Amenazar con un corte de servicio dentro de '24 horas' es una táctica de ingeniería social diseñada para inducir pánico, obligando a la víctima a actuar impulsivamente sin verificar los hechos."
      },
      maliciousLink: {
        en: "<strong>Suspicious Hyperlink:</strong> Hovering or inspecting this URL reveals it does not point to the official 'netflix.com'. It redirects to a harvesting page built to steal payment credentials.",
        es: "<strong>Hipervínculo Sospechoso:</strong> Al pasar el cursor o inspeccionar esta URL se revela que no apunta al sitio oficial de 'netflix.com'. Redirige a una página de recolección de datos creada para robar credenciales de pago."
      }
    }
  },
  {
    id: 2,
    type: "sms",
    interfaceLabel: {
      en: "Messages App",
      es: "Aplicación de Mensajes"
    },
    title: {
      en: "Scenario 2: The Missing Package Alert",
      es: "Escenario 2: Alerta de Paquete Perdido"
    },
    meta: {
      from: {
        en: '<span class="flag-target" data-flag="unknownSender" tabindex="0">+1 (833) 492-0192</span>',
        es: '<span class="flag-target" data-flag="unknownSender" tabindex="0">+1 (833) 492-0192</span>'
      },
      to: "Me / Yo",
      subject: {
        en: "SMS Text Message",
        es: "Mensaje de Texto SMS"
      }
    },
    body: {
      en: `
        <div class="sms-bubble">
          <p><strong>[USPS ALERT]</strong> Your package has been held at our local distribution center due to an incomplete delivery address.</p>
          <p>An administrative adjustment fee of $1.50 is required to schedule redelivery. Failure to act within <span class="flag-target" data-flag="smsUrgency" tabindex="0">12 hours</span> will result in the package being returned to sender.</p>
          <p>Update here: <a href="#" class="flag-target link-mock" data-flag="smsLink" onclick="return false;" tabindex="0">http://usps-post-redelivery.info/track</a></p>
        </div>
      `,
      es: `
        <div class="sms-bubble">
          <p><strong>[ALERTA USPS]</strong> Su paquete ha sido retenido en nuestro centro de distribución local debido a una dirección de entrega incompleta.</p>
          <p>Se requiere una tarifa de ajuste administrativo de $1.50 para programar la entrega. No actuar dentro de <span class="flag-target" data-flag="smsUrgency" tabindex="0">12 horas</span> resultará en la devolución del paquete al remitente.</p>
          <p>Actualice aquí: <a href="#" class="flag-target link-mock" data-flag="smsLink" onclick="return false;" tabindex="0">http://usps-post-redelivery.info/track</a></p>
        </div>
      `
    },
    explanations: {
      unknownSender: {
        en: "<strong>Unverified Short Code / Phone Number:</strong> Official logistics entities like USPS generally send automated tracking alerts via verified 5-digit short codes, not unlisted 10-digit consumer phone numbers.",
        es: "<strong>Código Corto / Teléfono no Verificado:</strong> Las entidades oficiales de logística como USPS generalmente envían alertas automatizadas de rastreo a través de códigos cortos de 5 dígitos verificados, no desde números de teléfono residenciales de 10 dígitos sin listar."
      },
      smsUrgency: {
        en: "<strong>Coercive Fee / Time Limit:</strong> Attackers combine an incredibly low cost ($1.50) with an aggressive deadline to make the hurdle feel low enough to pay immediately without secondary confirmation.",
        es: "<strong>Tarifa Coercitiva / Límite de Tiempo:</strong> Los atacantes combinan un costo increíblemente bajo ($1.50) con una fecha límite agresiva para que el obstáculo parezca lo suficientemente bajo como para pagar de inmediato sin confirmación secundaria."
      },
      smsLink: {
        en: "<strong>Unofficial URL Structure:</strong> The official post office domain is 'usps.com'. This link uses 'usps-post-redelivery.info', a cheap, newly registered tracking domain mimicking authentic infrastructure.",
        es: "<strong>Estructura de URL no Oficial:</strong> El dominio oficial de la oficina de correos es 'usps.com'. Este enlace utiliza 'usps-post-redelivery.info', un dominio de rastreo barato y registrado recientemente que imita la infraestructura auténtica."
      }
    }
  }
];