import { useState, useRef, useEffect } from 'react';
import Title from '../components/Title';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [contentHeight, setContentHeight] = useState({});
  const contentRefs = useRef([]);

  const faqs = [
    {
      question: 'What is artificial jewellery?',
      answer: `Artificial jewellery is made from non-precious materials, such as metals, beads, and synthetic stones, designed to mimic the look of fine jewellery. It’s a stylish and affordable alternative to real gold or silver jewellery.`,
    },
    {
      question: 'How do I care for my artificial jewellery?',
      answer: `To maintain your jewellery’s shine and longevity:
      - Store it in a cool, dry place away from direct sunlight.
      - Clean it gently with a soft cloth after wearing.
      - Avoid exposure to water, perfumes, and lotions.`,
    },
    {
      question: 'Do you offer customization?',
      answer: `Yes! We offer customization options for certain pieces. Please contact us with your ideas, and we’ll work with you to create a unique design.`,
    },
    {
      question: 'What materials do you use in your jewellery?',
      answer: `We use a variety of materials, including alloy metals, high-quality beads, resin, and synthetic stones. Our pieces are designed to be durable and lightweight.`,
    },
    {
      question: 'How can I place an order?',
      answer: `You can place an order directly through our website or by contacting us via phone or email. We accept various payment methods for your convenience.`,
    },
    {
      question: 'What is your return policy?',
      answer: `We accept returns within [30 days] of purchase if the item is in its original condition. Please refer to our return policy page for more details.`,
    },
    {
      question: 'Do you offer international shipping?',
      answer: `Yes, we offer international shipping! Shipping costs and times may vary depending on your location. Please check our shipping policy for more information.`,
    },
    {
      question: 'How can I track my order?',
      answer: `Once your order has been shipped, you will receive a tracking number via email. You can use this number to track your order on our website.`,
    },
    {
      question: 'Do you have a physical store?',
      answer: `Currently, we operate online only. However, we participate in local markets and exhibitions. Follow us on social media for updates on upcoming events!`,
    },
    {
      question: 'How can I contact customer service?',
      answer: `You can reach our customer service team via email at [your email address] or call us at [your phone number]. We are here to help you.`,
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    contentRefs.current.forEach((ref, index) => {
      if (ref) {
        setContentHeight((prev) => ({
          ...prev,
          [index]: activeIndex === index ? ref.scrollHeight : 0,
        }));
      }
    });
  }, [activeIndex]);

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* <div className="mb-16">
          <h2 className="text-4xl font-manrope text-center font-bold text-gray-900 leading-[3.25rem]">
            Frequently Asked Questions
          </h2>
        </div> */}
         <div className="text-2xl text-center pt-8 mb-16">
        <Title text1={"FREQUENTLY ASKED"} text2={"QUESTIONS"} />
      </div>
        <div className="accordion-group">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`accordion border border-solid border-gray-300 p-4 rounded-xl mb-8 transition duration-500 ${
                activeIndex === index ? 'bg-indigo-50 border-indigo-600' : ''
              }`}
            >
              <button
                className="accordion-toggle group inline-flex items-center justify-between text-left text-lg font-normal leading-8 text-gray-900 w-full transition duration-500 hover:text-indigo-600"
                onClick={() => toggleAccordion(index)}
                aria-controls={`collapse-${index}`}
                aria-expanded={activeIndex === index}
              >
                <h5>{faq.question}</h5>
                <svg
                  className={`w-6 h-6 text-gray-900 transition duration-500 ${
                    activeIndex === index ? 'hidden' : 'block'
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 12H18M12 18V6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <svg
                  className={`w-6 h-6 text-gray-900 transition duration-500 ${
                    activeIndex === index ? 'block' : 'hidden'
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 12H18"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
              <div
                ref={(el) => (contentRefs.current[index] = el)}
                className="accordion-content overflow-hidden transition-all duration-500"
                style={{ maxHeight: contentHeight[index] }}
              >
                <p className="text-base text-gray-900 font-normal leading-6 whitespace-pre-line">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
