import React from 'react';

const PasswordRequirements = ({ password }) => {
  const requirements = [
    { label: 'At least one digit', pattern: /(?=.*\d)/ },
    { label: 'At least one lowercase letter', pattern: /(?=.*[a-z])/ },
    { label: 'At least one uppercase letter', pattern: /(?=.*[A-Z])/ },
    { label: 'Minimum 8 characters', pattern: /.{8,}/ },
  ];

  const allRequirementsMet = requirements.every(req => req.pattern.test(password));

  if (allRequirementsMet) {
    return null;
  }

  return (
    <ul>
      {requirements.map((req, index) => (
        <li
          key={index}
          style={{ color: req.pattern.test(password) ? 'green' : 'red' }}
        >
          {req.label}
        </li>
      ))}
    </ul>
  );
};

export default PasswordRequirements;