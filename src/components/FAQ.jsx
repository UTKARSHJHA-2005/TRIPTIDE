import React from "react";

const styles = {
  section: "py-7 bg-white sm:py-10 lg:py-18",
  container: "max-w-6xl px-4 mx-auto sm:px-6 lg:px-8",
  title: "text-[10px] font-bold leading-tight text-black sm:text-2xl lg:text-3xl",
  flowRoot: "flow-root mt-10 sm:mt-12",
  divide: "divide-y divide-gray-200 -my-9",
  py: "py-8",
  question: "text-xl font-semibold text-black",
  answer: "mt-3 text-base text-gray-600",
};

const faqs = [
  {
    question: "How to create an account?",
    answers: [
      "You can signup by also using google account. We just need your email and password.",
      "After then, login in your account and then reload the page and boom you are now ready to create your planned trip.",
    ],
  },
  {
    question: "What payment method do you support?",
    answers: [
      "We accept Credit cards and Debit cards of any banks. We also accept the online services transactions like Paytm,UPI etc.",
    ],
  },
  {
    question: "Do we also get location of places and hotels?",
    answers: [
      "Yes, we will provide you the location, phone number.",
    ],
  },
];

const FAQ = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Frequently Asked Questions</h2>
        <div className={styles.flowRoot}>
          <div className={styles.divide}>
            {faqs.map((faq, index) => (
              <div key={index} className={styles.py}>
                <p className={styles.question}>{faq.question}</p>
                {faq.answers.map((answer, i) => (
                  <p key={i} className={styles.answer}>
                    {answer}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;