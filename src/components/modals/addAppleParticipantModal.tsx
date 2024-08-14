import { ModalBody, Box } from "@twilio-paste/core";
import { RefObject } from "react";
import ModalInputField from "./ModalInputField";
import AddParticipantFooter from "./addParticipantFooter";
import { ActionName } from "../../types";
import ConvoModal from "./ConvoModal";
import { AppState } from "../../store";
import { getTranslation } from "./../../utils/localUtils";
import { useSelector } from "react-redux";

interface AddAppleParticipantModalProps {
  name: string;
  isModalOpen: boolean;
  title: string;
  proxyName: string;
  setName: (name: string) => void;
  setProxyName: (name: string) => void;
  error: string;
  errorProxy: string;
  nameInputRef: RefObject<HTMLInputElement>;
  onBack: () => void;
  action: () => void;
  handleClose: () => void;
}

const AddAppleParticipantModal: React.FC<AddAppleParticipantModalProps> = (
  props: AddAppleParticipantModalProps
) => {
  const local = useSelector((state: AppState) => state.local);
  const addAppleParticipant = getTranslation(local, "addAppleParticipant");
  const appleNum = getTranslation(local, "appleNum");
  const appleHelpTxt = getTranslation(local, "appleHelpTxt");
  const proxyNum = getTranslation(local, "proxyNum");
  const proxyAppleNumHelpTxt = getTranslation(local, "proxyAppleNumHelpTxt");

  return (
    <>
      <ConvoModal
        handleClose={() => props.handleClose()}
        isModalOpen={props.isModalOpen}
        title={props.title}
        modalBody={
          <ModalBody>
            <h3>{addAppleParticipant}</h3>
            <Box
              as="form"
              onKeyPress={async (e) => {
                if (e.key === "Enter") {
                  if (props.action) {
                    e.preventDefault();
                    props.action();
                  }
                }
              }}
            >
              <ModalInputField
                isFocused={true}
                label={appleNum}
                input={props.name}
                placeholder="apple:urn:mbid: ..."
                onChange={props.setName}
                error={props.error}
                help_text={appleHelpTxt}
                prefixType="apple:"
              />
              <ModalInputField
                label={proxyNum}
                input={props.proxyName}
                placeholder="apple:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                onChange={props.setProxyName}
                error={props.errorProxy}
                help_text={proxyAppleNumHelpTxt}
                prefixType="apple:"
              />
            </Box>
          </ModalBody>
        }
        modalFooter={
          <AddParticipantFooter
            isSaveDisabled={
              !props.name.trim() || !props.proxyName.trim() || !!props.error
            }
            actionName={ActionName.Save}
            onBack={() => {
              props.onBack();
            }}
            action={props.action}
          />
        }
      />
    </>
  );
};

export default AddAppleParticipantModal;
