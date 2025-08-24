import { useState, useEffect } from "react";

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | null;
}

interface ValidationRules {
  [key: string]: ValidationRule;
}

interface ValidationErrors {
  [key: string]: string;
}

interface FormData {
  [key: string]: string | number;
}

export const useFormValidation = (initialData: FormData, rules: ValidationRules) => {
  const [data, setData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<{[key: string]: boolean}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name: string, value: string | number): string => {
    const rule = rules[name];
    if (!rule) return "";

    const stringValue = String(value);

    if (rule.required && !stringValue.trim()) {
      return "This field is required";
    }

    if (rule.minLength && stringValue.length < rule.minLength) {
      return `Must be at least ${rule.minLength} characters`;
    }

    if (rule.maxLength && stringValue.length > rule.maxLength) {
      return `Must be no more than ${rule.maxLength} characters`;
    }

    if (rule.pattern && !rule.pattern.test(stringValue)) {
      return "Please enter a valid format";
    }

    if (rule.custom) {
      const customError = rule.custom(stringValue);
      if (customError) return customError;
    }

    return "";
  };

  const validateAll = (): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    Object.keys(rules).forEach(field => {
      const error = validateField(field, data[field] || "");
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (name: string, value: string | number) => {
    setData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation for touched fields
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, data[name] || "");
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (onSubmit: (data: FormData) => Promise<void> | void) => {
    setIsSubmitting(true);
    
    // Mark all fields as touched
    const allTouched: {[key: string]: boolean} = {};
    Object.keys(rules).forEach(field => {
      allTouched[field] = true;
    });
    setTouched(allTouched);

    if (validateAll()) {
      try {
        await onSubmit(data);
      } catch (error) {
        console.error("Form submission error:", error);
      }
    }
    
    setIsSubmitting(false);
  };

  const reset = () => {
    setData(initialData);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  };

  const isValid = Object.keys(errors).length === 0 || Object.values(errors).every(error => !error);

  return {
    data,
    errors,
    touched,
    isSubmitting,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setData,
    validateField
  };
};