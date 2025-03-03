import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Faqs.scss";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: "What is SNOWBUNS?",
      answer:
        "SNOWBUNS is a subscription-based content platform where creators can share exclusive content with their audience. It supports cryptocurrency payments alongside traditional options like credit cards and PayPal for maximum flexibility and privacy.",
    },
    {
      question: "How do I subscribe to a creator's content?",
      answer:
        "1. Create an account.\n2. Navigate to the creator's profile and click \n3. Choose your preferred payment method (crypto, wallet balance, credit card, or PayPal).\n4. Complete the payment and enjoy exclusive content!",
    },
    {
      question: "Which cryptocurrencies do you accept?",
      answer:
        "We currently accept Bitcoin (BTC), Ethereum (ETH), USDT, and other popular cryptocurrencies. Check the payment page for the full list.",
    },
    {
      question: "Are cryptocurrency payments anonymous?",
      answer:
        "Yes, cryptocurrency payments are processed securely, providing an extra layer of privacy compared to traditional payment methods.",
    },
    {
      question: "How do I view the content I've subscribed to?",
      answer:
        "Once subscribed, you'll have access to the creator's exclusive content on their profile page.",
    },
    {
      question: "Are credit card and PayPal transactions secure?",
      answer:
        "Absolutely! We use advanced encryption and a secure payment gateway to protect your data and transactions.",
    },
    {
      question: "How do I become a creator on SNOWBUNS?",
      answer:
        "You go to your PROFILE section and start uploading content and customizing your profile. You add payment method, subscription price and information. Your video thumbnails & titles will be visible to everyone, the video itself would need a subscription.",
    },
    {
      question: "How and when do I get paid?",
      answer:
        "Creators are paid weekly or monthly (based on your preference). You can choose a way to be paid (credit card, crypto currency or PayPal)",
    },
    {
      question: "What percentage does SNOWBUNS take?",
      answer:
        "We take a competitive platform fee of 20% from each transaction to cover operational costs. But you can limit it to 10% by buying SNOWBUNS PREMIUM",
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h1 className="faq-header">
        <i className="fa fa-info-circle"></i>&nbsp;FAQs
      </h1>
      <div className="faq-list">
        {faqData.map((item, index) => (
          <motion.div key={index} className="faq-item" initial={false}>
            <button
              className={`faq-question ${
                activeIndex === index ? "active" : ""
              }`}
              onClick={() => toggleAccordion(index)}
            >
              {item.question}
              <span className="icon">{activeIndex === index ? "−" : "+"}</span>
            </button>
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  className="faq-answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p>{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
