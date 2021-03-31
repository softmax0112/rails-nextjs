import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.scss";
import { useRef, useState, useEffect } from "react";
import Header from "../components/header";
import ProviderCard from "../components/providers/providerCard";
import CustomButton from "../components/buttons/button";
import ModalBox from "../components/modalBox";
import {
  useDebouncedEffect,
  useInfiniteScroll
} from "../components/customHooks";
import { getCookie } from "../service/auth";
import { apiCall } from "../service/common";
import LoadingCard from "../components/skeleton";

export function CheckmarkIcon() {
  return (
    <>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 0C5.373 0 0 5.373 0 12C0 18.627 5.373 24 12 24C18.627 24 24 18.627 24 12C24 5.373 18.627 0 12 0ZM10.75 17.292L6.25 12.928L8.107 11.07L10.75 13.576L16.393 7.792L18.25 9.649L10.75 17.292Z"
          fill="#75D15D"
        />
      </svg>
      is valid
    </>
  );
}

export function CancelIcon() {
  return (
    <>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 0C5.373 0 0 5.373 0 12C0 18.627 5.373 24 12 24C18.627 24 24 18.627 24 12C24 5.373 18.627 0 12 0ZM16.151 17.943L12.008 13.841L7.891 18L6.058 16.167L10.162 12.01L6 7.891L7.833 6.058L11.988 10.16L16.094 6L17.943 7.849L13.843 11.99L18 16.094L16.151 17.943Z"
          fill="#F26358"
        />
      </svg>
      is taken
    </>
  );
}

export default function Home() {
  const [activeEditButton, setActiveEditButton] = useState("none");
  const [data, setData] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [APIError, setAPIError] = useState(null);
  const [nextPage, setNextPage] = useState<null | number>(null);
  const [isFetching, setIsFetching, stop] = useInfiniteScroll(getMoreFeed);

  const getProviders = async () => {
    const res = await apiCall({ method: "GET", url: "/providers" });

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
      //@ts-ignore
      res.next ? setNextPage(2) : (setNextPage(null), (stop.current = true));
    }
  };

  async function getMoreFeed() {
    if (nextPage) {
      const res = await apiCall({
        method: "GET",
        url: `/providers?page=${nextPage}`
      });
      if (res === "500") {
        setAPIError(500);
      } else {
        setData({
          ...data,
          providers: [...data.providers, ...res.providers]
        });
        //@ts-ignore
        setIsFetching(false);
        res.next
          ? setNextPage(nextPage + 1)
          : //@ts-ignore
            (setNextPage(null), (stop.current = true));
      }
    } else {
      //@ts-ignore
      setIsFetching(false);
    }
  }

  const is_admin = () => {
    let token = getCookie("token");
    setAdmin(token ? true : false);
  };

  useEffect(() => {
    getProviders();
    is_admin();
  }, []);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    specialization: "",
    username: "",
    email: ""
  });

  const [firstNameError, setFirstNameError] = useState(true);
  const [lastNameError, setLastNameError] = useState(true);
  const [emailError, setEmailError] = useState(true);
  const [usernameError, setUsernameError] = useState(true);
  const [addressError, setAddressError] = useState(true);
  const [cityError, setCityError] = useState(true);
  const [stateError, setStateError] = useState(true);
  const [specializationError, setSpecializationError] = useState(true);

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [emailValid, setEmailValid] = useState(false);
  const [usernameValid, setUsernameValid] = useState(false);

  const [tempIDCount, setTempIDCount] = useState(Number.MAX_SAFE_INTEGER);

  const formRef = useRef(null);

  const handleAddProvider = () => {
    document.body.style.overflow = "hidden";
    setActiveEditButton("edit");
  };

  const handleCancelClickInCreateButton = () => {
    document.body.style.overflow = "visible";
    setActiveEditButton("none");
    setUsername("");
    setErrors({
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      specialization: "",
      username: "",
      email: ""
    });
    setEmail("");
  };

  const handleSaveClickInCreateButton = () => {
    const formData = new FormData(formRef.current) as any;
    const currTime = new Date();

    setData({
      ...data,
      providers: [
        {
          id: tempIDCount,
          first_name: formData.get("providerFirstName"),
          last_name: formData.get("providerLastName"),
          username: formData.get("providerUsername"),
          specialization_name: formData.get("providerSpecialization"),
          email: formData.get("providerEmail"),
          address: formData.get("providerAddress"),
          city: formData.get("providerCity"),
          state: formData.get("providerState"),
          created_at: currTime.toISOString(),
          updated_at: currTime.toISOString()
        },
        ...data.providers
      ]
    });

    createProviderAPICall(formData);
    setUsername("");
    setEmail("");
    setTempIDCount(tempIDCount - 1);

    setErrors({
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      specialization: "",
      username: "",
      email: ""
    });

    document.body.style.overflow = "visible";
    setActiveEditButton("none");
  };

  const createProviderAPICall = async (formData) => {
    const serializerData = {
      first_name: formData.get("providerFirstName"),
      last_name: formData.get("providerLastName"),
      username: formData.get("providerUsername"),
      email: formData.get("providerEmail"),
      specialization: formData.get("providerSpecialization"),
      address: formData.get("providerAddress"),
      city: formData.get("providerCity"),
      state: formData.get("providerState")
    };
    apiCall({
      method: "POST",
      url: `/providers/`,
      body: serializerData
    }).catch((error) => {
      console.log(error);
    });
  };

  useDebouncedEffect(
    () => {
      !emailError && checkValidEmail();
    },
    800,
    [email]
  );

  useDebouncedEffect(
    () => {
      !usernameError && checkValidUsername();
    },
    800,
    [username]
  );

  const checkValidUsername = async () => {
    const res = await apiCall({
      method: "GET",
      url: `/providers/valid_username?username=${username}`
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
      setUsernameValid(res.username);
    }
  };

  const checkValidEmail = async () => {
    const res = await apiCall({
      method: "GET",
      url: `/providers/valid_email?email=${email}`
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
      setEmailValid(res.email);
    }
  };

  const formHandler = (event) => {
    const { name, value } = event.target;
    let tempErrors = errors;
    switch (name) {
      case "providerFirstName":
        tempErrors.firstName =
          value.length < 1 ? "Please enter your first name" : "";
        setFirstNameError(tempErrors.firstName.length > 0 ? true : false);
        break;

      case "providerLastName":
        tempErrors.lastName =
          value.length < 1 ? "Please enter your last name" : "";
        setLastNameError(tempErrors.lastName.length > 0 ? true : false);
        break;

      case "providerUsername":
        setUsername(value);
        tempErrors.username = value.length < 4 ? "Username is not valid" : "";
        setUsernameError(tempErrors.username.length > 0 ? true : false);
        break;

      case "providerEmail":
        setEmail(value);
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        tempErrors.email = re.test(value) ? "" : "Email is not valid";
        setEmailError(tempErrors.email.length > 0 ? true : false);
        break;

      case "providerAddress":
        tempErrors.address =
          value.length < 1 ? "Please enter your address" : "";
        setAddressError(tempErrors.address.length > 0 ? true : false);
        break;

      case "providerCity":
        tempErrors.city = value.length < 1 ? "Please enter your city" : "";
        setCityError(tempErrors.city.length > 0 ? true : false);
        break;

      case "providerState":
        tempErrors.state = value.length < 1 ? "Please enter your state" : "";
        setStateError(tempErrors.state.length > 0 ? true : false);
        break;

      case "providerSpecialization":
        tempErrors.specialization =
          value.length < 1 ? "Please enter your specialization" : "";
        setSpecializationError(
          tempErrors.specialization.length > 0 ? true : false
        );
        break;

      default:
        break;
    }
    setErrors(tempErrors);
  };

  if (APIError) {
    return <h1>Some Problem occured, please try after some time</h1>;
  } else {
    return (
      <>
        {data && activeEditButton == "edit" && (
          <ModalBox
            cardType="default"
            title="Create Provider"
            description="Fill the details below to create a provider"
            cancelButtonCallback={handleCancelClickInCreateButton}
            applyButtonCallback={handleSaveClickInCreateButton}
            applyButtonDisable={
              firstNameError ||
              lastNameError ||
              addressError ||
              emailError ||
              usernameError ||
              cityError ||
              stateError ||
              specializationError ||
              !usernameValid ||
              !emailValid
            }
          >
            <form className={styles.left_edit_panel_form} ref={formRef}>
              <div className={styles.input_container}>
                <label>
                  <span>First Name</span>
                  <span className={styles.contact_form_error}>
                    {errors.firstName}
                  </span>
                  <input name="providerFirstName" onChange={formHandler} />
                </label>

                <label>
                  <span>Last Name</span>
                  <span className={styles.contact_form_error}>
                    {errors.lastName}
                  </span>
                  <input name="providerLastName" onChange={formHandler} />
                </label>

                <label>
                  <span>Specialization</span>
                  <span className={styles.contact_form_error}>
                    {errors.specialization}
                  </span>
                  <input name="providerSpecialization" onChange={formHandler} />
                </label>

                <label>
                  <div style={{ display: "flex" }}>
                    <span>Username</span>
                    {!usernameError &&
                      (usernameValid ? <CheckmarkIcon /> : <CancelIcon />)}
                  </div>

                  <span className={styles.contact_form_error}>
                    {errors.username}
                  </span>
                  <input
                    name="providerUsername"
                    value={username}
                    onChange={formHandler}
                  />
                </label>

                <label>
                  <div style={{ display: "flex" }}>
                    <span>Email</span>
                    {!emailError &&
                      (emailValid ? <CheckmarkIcon /> : <CancelIcon />)}
                  </div>
                  <span className={styles.contact_form_error}>
                    {errors.email}
                  </span>
                  <input
                    name="providerEmail"
                    value={email}
                    onChange={formHandler}
                  />
                </label>

                <label>
                  <span>Address</span>
                  <span className={styles.contact_form_error}>
                    {errors.address}
                  </span>
                  <input name="providerAddress" onChange={formHandler} />
                </label>

                <label>
                  <span>City</span>
                  <span className={styles.contact_form_error}>
                    {errors.city}
                  </span>
                  <input name="providerCity" onChange={formHandler} />
                </label>

                <label>
                  <span>State</span>
                  <span className={styles.contact_form_error}>
                    {errors.state}
                  </span>
                  <input name="providerState" onChange={formHandler} />
                </label>
              </div>
            </form>
          </ModalBox>
        )}

        <div className={styles.container}>
          <Head>
            <title>Providers</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <Header />

          <section className={styles.providers_container}>
            {admin && (
              <CustomButton fill={true} clickAction={handleAddProvider}>
                + Add New Provider
              </CustomButton>
            )}

            <h3>Providers</h3>
            {!data && <LoadingCard />}
            <div className={styles.providers_grid}>
              {data &&
                data.providers?.map((provider) => {
                  return <ProviderCard key={provider.id} provider={provider} />;
                })}
            </div>
          </section>
        </div>
      </>
    );
  }
}
