import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { useMutation } from '@apollo/client';
import NProgress from 'nprogress';
import gql from 'graphql-tag';
import { useRouter } from 'next/dist/client/router';
import styled from 'styled-components';

import { CURRENT_USER_QUERY } from './User';
import { useCart } from '../lib/cartState';
import StyledButton from './styles/StyledButton';

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0,0,0,0.04);
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    checkout(token: $token) {
      id
      charge
      total
      items {
        id
        name
      }
    }
  }
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

function CheckoutForm() {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { closeCart } = useCart();
  const [checkout, { error: graphQLError }] = useMutation(CREATE_ORDER_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    NProgress.start();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      setError(error);
      NProgress.done();
      return;
    }

    const order = await checkout({
      variables: {
        token: paymentMethod.id,
      },
    });

    router.push({
      pathname: '/order/[id]',
      query: { id: order.data.checkout.id },
    });

    closeCart();
    setLoading(false);
    NProgress.done();
  };

  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {error && <p style={{ fontSize: 12 }}>{error.message}</p>}
      {graphQLError && <p style={{ fontSize: 12 }}>{graphQLError.message}</p>}
      <CardElement />
      <StyledButton style={{ fontWeight: 900 }}>{loading ? 'Processing...' : 'Checkout'}</StyledButton>
    </CheckoutFormStyles>
  );
}

const Checkout = () => {
  return (
    <Elements stripe={stripeLib}>
      <CheckoutForm />
    </Elements>
  );
}

export { Checkout };