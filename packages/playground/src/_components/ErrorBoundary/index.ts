import { Component } from 'react';

interface ErrorBoundaryProps {
  onError?: () => void;
  fallback?: string | JSX.Element;
  children: JSX.Element;
}

class ErrorBoundary extends Component<ErrorBoundaryProps> {
  state = {
    hasError: false,
  };

  componentDidCatch(error, info) {
    console.log('ERROR', error, info);

    this.props.onError && this.props.onError();

    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError)
      return (
        this.props.fallback ||
        'Что-то пошло не так. Обновите страницу, пожалуйста.'
      );

    return this.props.children;
  }
}

export default ErrorBoundary;
