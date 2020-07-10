import Head from "next/head";
import useSWR from "swr";
import NumberFormat from "react-number-format";

const pageLoad = new Date().getTime() / 1000;

export default function Home() {
  const { data: salary } = useSWR(
    "getPaid",
    () => {
      const multiplier = 2489;
      const string2020 = "2020-01-01 00:00:00";
      const now = new Date().getTime() / 1000;
      const start = new Date(string2020).getTime() / 1000;
      return {
        total: (now - start) * multiplier,
        accrued: (now - pageLoad) * multiplier,
      };
    },
    { refreshInterval: 1000 }
  );

  return (
    <div className="container">
      <Head>
        <title>How much is Jeff Bezos making?</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-center">
        <h1>How much money has Jeff Bezos made in 2020?</h1>
        <h2
          style={{
            marginTop: "15px",
            color: "red",
            fontFamily: "Lucida Console, Monaco, monospace",
          }}
        >
          <NumberFormat
            value={salary ? salary.total : 0}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
            decimalScale={2}
            fixedDecimalScale={true}
          />
        </h2>

        <p className="lead">
          According to{" "}
          <a
            style={{ color: "#03a9f4" }}
            href="https://www.businessinsider.com/how-rich-is-jeff-bezos-mind-blowing-facts-net-worth-2019-4"
            target="_blank"
          >
            this article
          </a>
          , Jeff Bezos is making roughly $2,489 <em>per second</em>.
        </p>
        <p className="mt-5">
          <em>Since loading this page?</em>
        </p>
        <p
          style={{
            color: "red",
            fontFamily: "Lucida Console, Monaco, monospace",
          }}
        >
          <NumberFormat
            value={salary ? salary.accrued : 0}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
            decimalScale={2}
            fixedDecimalScale={true}
          />
        </p>
        <small>As of {new Date().toLocaleString()}</small>
      </main>
    </div>
  );
}
