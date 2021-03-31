import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import styles from "../../../styles/profile.module.scss";
import CustomButton from "../../../components/buttons/button";
import Header from "../../../components/header";
import Head from "next/head";
import {
  LocationIcon,
  SpecialityIcon
} from "../../../components/providers/providerCard";
import { apiCall } from "../../../service/common";
import { getCookie } from "../../../service/auth";

const Loading: React.SFC<{}> = () => {
  return (
    <div className={styles.spinner_container}>
      <svg className={styles.spinner}>
        <circle cx="25" cy="25" r="25">
          {" "}
        </circle>
      </svg>
    </div>
  );
};

const Profile: React.SFC<{}> = () => {
  const router = useRouter();
  const { username } = router.query;

  const [errors, setErrors] = useState({
    email: ""
  });

  const [emailError, setEmailError] = useState(true);
  const [data, setData] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [APIError, setAPIError] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [emailConirmation, setEmailConirmation] = useState(false);

  const getProvider = async () => {
    const res = await apiCall({
      method: "GET",
      url: `/providers/search_provider?username=${username}`
    });

    if (res == "404" || res == "401" || res == "500") {
      // if API doen't return 404 or 500 this will be rendered
      switch (res) {
        case "404":
          setAPIError(404);
          break;

        case "500":
          setAPIError(500);
          break;

        case "401":
          setAPIError(401);
          break;

        default:
          break;
      }
    } else {
      setData(res);
    }
  };

  const is_admin = () => {
    let token = getCookie("token");
    setAdmin(token ? true : false);
  };

  useEffect(() => {
    if (!username) {
      return;
    } else {
      getProvider();
      is_admin();
    }
  }, [router]);

  const emailFormRef = useRef(null);
  const formHandler = (event) => {
    const { name, value } = event.target;
    let tempErrors = errors;
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    tempErrors.email = re.test(value) ? "" : "Email is not valid";
    setEmailError(tempErrors.email.length > 0 ? true : false);
    setErrors(tempErrors);
  };

  const createCustomerAPICall = async (formData) => {
    const serializerData = {
      email: formData.get("email"),
      provider_id: data.provider.id
    };
    apiCall({
      method: "POST",
      url: `/customers/`,
      body: serializerData
    }).catch((error) => {
      console.log(error);
    });
  };

  const deleteProviderAPICall = async () => {
    apiCall({
      method: "DELETE",
      url: `/providers/${data.provider.id}`
    }).catch((error) => {
      console.log(error);
    });
  };

  const handleSubmitEmail = () => {
    const formData = new FormData(emailFormRef.current) as any;
    createCustomerAPICall(formData);
    setEmailConirmation(true);
  };

  const handleDeleteButtonClick = () => {
    deleteProviderAPICall();
    setDeleteConfirmation(true);
    // router.prefetch("/");
  };

  if (APIError) {
    return <h1>Some Problem occured, please try after some time</h1>;
  } else {
    return (
      <>
        <div>
          <Head>
            <title>{username} | Profile</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <Header />

          {data ? (
            <section className={styles.container}>
              <h3>Provider</h3>

              <div className={styles.provider_container}>
                <div>
                  <img
                    alt={`${username} Image`}
                    src="https://placekitten.com/g/550/450"
                    className={styles.provider_img}
                  />
                </div>

                <div className={styles.right_container}>
                  <span>{`${data.provider.first_name} ${data.provider.last_name}`}</span>
                  <p>@{username}</p>

                  <div className={styles.sub_container}>
                    <LocationIcon />
                    <span>Location:</span>
                    <p>{`${data.provider.city} ${data.provider.state}`}</p>
                  </div>

                  <div className={styles.sub_container}>
                    <SpecialityIcon />
                    <span>Specialty:</span>
                    <p>{data.provider.specialization_name}</p>
                  </div>

                  <form ref={emailFormRef}>
                    <label className={styles.form}>
                      <span>Email</span>
                      <br />
                      <span className={styles.contact_form_error}>
                        {errors.email}
                      </span>
                      <input
                        name="email"
                        type="email"
                        className={styles.text_input}
                        placeholder="email"
                        onChange={formHandler}
                      />
                    </label>
                  </form>

                  <CustomButton
                    clickAction={handleSubmitEmail}
                    disabled={emailError || emailConirmation}
                  >
                    Message
                  </CustomButton>
                  {emailConirmation && <span> Email sent</span>}
                </div>
              </div>
              {admin && (
                <CustomButton
                  fill={true}
                  color="red"
                  clickAction={handleDeleteButtonClick}
                >
                  Delete
                </CustomButton>
              )}
              {deleteConfirmation && <span> Provider Deleted</span>}
            </section>
          ) : (
            <Loading />
          )}
        </div>
      </>
    );
  }
};

export default Profile;
