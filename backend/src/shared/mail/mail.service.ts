import { Injectable } from "@nestjs/common";
import nodeMailer from "nodemailer";
import { EnvService } from "../env/env.service";
import SMTPTransport from "nodemailer/lib/smtp-transport";

@Injectable()
export class MailService {
  constructor(private readonly env: EnvService) {}
  private readonly options: SMTPTransport | SMTPTransport.Options = {
    host: this.env.get("MAIL_HOST"),
    port: +this.env.get("MAIL_PORT"),
    auth: {
      user: this.env.get("MAIL_USERNAME"),
      pass: this.env.get("MAIL_PASSWORD"),
    },
    secure: this.env.get("NODE_ENV") === "production",
  };
  private readonly mailer = nodeMailer.createTransport(this.options);

  public async sendMail(
    to: string | string[],
    subject: string,
    text: string,
    html: string,
  ) {
    if (Array.isArray(to)) to = to.join(", ");
    const from = `${this.env.get("MAIL_USERNAME")} <${this.env.get("MAIL_EMAIL")}>`;
    await this.mailer.sendMail({ from, to, subject, text, html });

    // TODO: Error handling
  }

  public async mailTemplate(title: string, content: string) {
    // TODO: Template
    const text = `Company Name\n\nSubject\n\n${title}\n\n${content}\n\nHizmetlerimiz ile ilgili herhangi bir sorunuz veya ek bilgiye ihtiyacınız varsa, lütfen çekinmeden bizimle iletişime geçin.\n\nCompany Name\n08xxxxxxxxx\ncompany.mail@mail.com\naddress, Dünya\n\nBu e-posta, [Company name] adına size haber ile ilgili bilgi iletmek amacıyla gönderilmiştir.`;
    const html = `<!doctype html>
<html>
  <head>
    <title>${title}</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body
    class="flex flex-col items-center justify-center bg-gray-200 p-4 text-center text-gray-950 dark:bg-gray-800 dark:text-gray-50"
  >
    <div
      class="container flex min-h-[calc(100vh-2rem)] flex-col gap-4 [&>*]:rounded [&>*]:bg-gray-50 [&>*]:p-4 [&>*]:dark:bg-gray-950"
    >
      <header
        class="flex flex-col items-center gap-4 [&>*]:w-[1000px] [&>*]:max-w-full"
      >
        <h1 class="text-2xl font-semibold sm:text-3xl md:text-4xl lg:text-5xl">
          Company Name
        </h1>

        <p class="text-sm text-gray-700 dark:text-gray-300 sm:text-base">
          Subject
        </p>
      </header>

      <main
        class="flex flex-1 flex-col items-center gap-4 text-sm sm:text-base [&>*]:w-[1000px] [&>*]:max-w-full"
      >
        <h2 class="text-xl font-semibold sm:text-2xl md:text-3xl lg:text-4xl">
          title
        </h2>

        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi
          voluptatibus earum, quis illum natus magnam, incidunt sapiente
          reprehenderit deserunt quisquam facere qui ut sequi commodi
          consectetur hic quaerat! Animi, corrupti?
        </p>
      </main>

      <footer
        class="flex flex-col items-center gap-4 text-sm text-gray-700 dark:text-gray-300 sm:text-base [&>*]:w-[1000px] [&>*]:max-w-full"
      >
        <p>
          Hizmetlerimiz ile ilgili herhangi bir sorunuz veya ek bilgiye
          ihtiyacınız varsa, lütfen çekinmeden bizimle iletişime geçin.
        </p>
        <section class="flex flex-col items-center justify-center gap-4">
          <h2 class="text-xl font-semibold sm:text-2xl md:text-3xl lg:text-4xl">
            Company Name
          </h2>

          <div
            class="flex flex-col items-center justify-center gap-4 md:flex-row"
          >
            <p>08xxxxxxxxx</p>
            <p>company.mail@mail.com</p>
          </div>
          <p>address, Dünya</p>
        </section>

        <p>
          Bu e-posta, [Company name] adına size haber ile ilgili bilgi iletmek
          amacıyla gönderilmiştir.
        </p>
      </footer>
    </div>
  </body>
</html>
`;
    return { text, html };
  }
}
