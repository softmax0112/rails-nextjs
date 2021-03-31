import styles from "../styles/components/modalBox.module.scss";
import { useEffect, useRef } from "react";
import CustomButton from "./buttons/button";

export interface ModalBoxProps {
  children?: React.ReactNode;
  cardType?: string;
  title?: string;
  description?: string;
  applyButtonCallback?: () => void;
  applyButtonDisable?: boolean;
  cancelButtonCallback?: () => void;
  dark?: number;
  card?: boolean;
}

const ModalBox: React.SFC<ModalBoxProps> = ({
  children,
  cardType,
  title,
  description,
  applyButtonCallback,
  applyButtonDisable,
  cancelButtonCallback,
  dark,
  card
}) => {
  const modalRef = useRef(null);

  const handleClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      if (cancelButtonCallback) {
        cancelButtonCallback();
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <>
      {cardType === "custom" && (
        <div className={card ? styles.overlay_open_card : styles.overlay_open}>
          <main
            style={{ background: `rgba(0, 0 , 0, ${dark})` }}
            className={styles.main_container}
          >
            <div ref={modalRef} className={styles.children_container}>
              {children}
            </div>
          </main>
        </div>
      )}

      {cardType === "default" && (
        <div className={card ? styles.overlay_open_card : styles.overlay_open}>
          <div className={styles.popup_edit_container}>
            <div className={styles.popup_card_container} ref={modalRef}>
              <div className={styles.popup_header_container}>
                <span>{title}</span>
              </div>

              <hr className={styles.header_break_line} />

              <div className={styles.popup_explain_container}>
                <span>{description}</span>
              </div>

              <hr className={styles.header_break_line} />

              <main className={styles.main_container_default}>{children}</main>

              <hr style={{ width: "100%", opacity: "0.25" }} />

              <div className={styles.footer_button_container}>
                <CustomButton color="red" clickAction={cancelButtonCallback}>
                  Cancel
                </CustomButton>

                <CustomButton
                  clickAction={applyButtonCallback}
                  disabled={applyButtonDisable}
                >
                  Save
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

ModalBox.defaultProps = {
  cardType: "custom",
  title: "",
  description: "",
  applyButtonDisable: true,
  dark: 0.001,
  card: false,
  applyButtonCallback: null,
  cancelButtonCallback: null
};

export default ModalBox;
