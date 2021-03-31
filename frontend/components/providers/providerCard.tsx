import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Home.module.scss";
import CustomButton from "../buttons/button";
import { useRef, useState, useEffect } from "react";
import ModalBox from "../modalBox";
import { apiCall } from "../../service/common";
import { ProviderType } from "../types";

export function LocationIcon() {
  return (
    <svg
      width="13"
      height="20"
      viewBox="0 0 13 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.5 1.66667C9.09675 1.66667 11.375 3.84833 11.375 6.335C11.375 8.9125 9.34944 12.2783 6.5 16.8858C3.65056 12.2783 1.625 8.9125 1.625 6.335C1.625 3.84833 3.90325 1.66667 6.5 1.66667ZM6.5 0C3.08913 0 0 2.83583 0 6.335C0 9.83333 2.81856 14.01 6.5 20C10.1814 14.01 13 9.83333 13 6.335C13 2.83583 9.91169 0 6.5 0V0ZM6.5 9.16667C5.15369 9.16667 4.0625 8.0475 4.0625 6.66667C4.0625 5.28583 5.15369 4.16667 6.5 4.16667C7.84631 4.16667 8.9375 5.28583 8.9375 6.66667C8.9375 8.0475 7.84631 9.16667 6.5 9.16667Z"
        fill="#5D6970"
      />
    </svg>
  );
}

export function SpecialityIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 1.5C13.1355 1.5 16.5 4.8645 16.5 9C16.5 13.1355 13.1355 16.5 9 16.5C4.8645 16.5 1.5 13.1355 1.5 9C1.5 4.8645 4.8645 1.5 9 1.5ZM9 0C4.02975 0 0 4.02975 0 9C0 13.9703 4.02975 18 9 18C13.9703 18 18 13.9703 18 9C18 4.02975 13.9703 0 9 0ZM7.6245 7.2645L4.5 7.69575L6.774 9.88125L6.219 12.9855L9 11.499L11.781 12.9862L11.226 9.882L13.5 7.69575L10.3755 7.2645L9 4.4265L7.6245 7.2645Z"
        fill="#5D6970"
      />
    </svg>
  );
}

export interface ProviderCardProps {
  provider: ProviderType;
}

const ProviderCard: React.SFC<ProviderCardProps> = ({ provider }) => {
  const {
    id,
    first_name,
    last_name,
    username,
    email,
    address,
    city,
    state,
    created_at,
    updated_at,
    specialization_name
  } = provider;

  return (
    <>
      <div className={styles.card_container}>
        <div>
          <Link href={{ pathname: `/profile/${username}` }}>
            <a>
              <img
                alt={`${username} Image`}
                src="https://placekitten.com/g/285/285"
                className={styles.provider_img}
              />
            </a>
          </Link>
        </div>

        <div className={styles.description_container}>
          <Link href={{ pathname: `/profile/${username}` }}>
            <h4>{`${first_name} ${last_name}`}</h4>
          </Link>

          <div className={styles.location_container}>
            <LocationIcon />
            <p>{`${city}, ${state}`}</p>
          </div>

          <div className={styles.sub_container}>
            <SpecialityIcon />
            <h4>{specialization_name}</h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProviderCard;
