import React from 'react';
import { Check } from 'lucide-react';

const Pricing: React.FC = () => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: [
        'Access to 100+ basic papers',
        'Limited searches per day',
        'Community support',
        'Basic filters',
      ],
    },
    {
      name: 'Pro',
      price: '$9.99',
      period: 'per month',
      features: [
        'Access to all 10,000+ papers',
        'Unlimited searches',
        'Priority support',
        'Advanced filters',
        'Download options',
        'Study materials',
      ],
      popular: true,
    },
    {
      name: 'Student',
      price: '$4.99',
      period: 'per month',
      features: [
        'Access to 5,000+ papers',
        'Unlimited searches',
        'Email support',
        'Advanced filters',
        'Download options',
      ],
    },
  ];

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Choose the plan that's right for you. All plans include access to our extensive collection of previous year papers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`bg-white rounded-2xl shadow-lg p-8 ${
              plan.popular ? 'border-2 border-indigo-500 relative' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-indigo-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
            )}
            
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
            <div className="mb-4">
              <span className="text-4xl font-bold">{plan.price}</span>
              <span className="text-gray-600 ml-2">/{plan.period}</span>
            </div>
            
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
            
            <button
              className={`w-full py-3 rounded-lg font-semibold transition ${
                plan.popular
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
            >
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;