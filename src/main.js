const props = {
    "companyId": "554fc17e-065e-4f26-b5e1-e496751ef7bc",
    "loginPolicyId": "vomQxcoHNFw3VStMfmQE9oQz9lh4ik97",
    "apiKey": "1FfTiIKrVBHjHkMYsx3nMhtxP7Gs6bDKt74Nsc1TQexF4miurXbvUlFsVSRXdzMPHLYxpnG5RbiHBboJe097AbIHo2mBCRCLoxyqb9XJ5oDN16Le9wXgtsFTNOw4bDs19OTY9CNdtWSL2PmNZtdGGACtYOClmdSYfuObx4VyjllHPweyy4bZYDWtfMuje4BKxV9yTV0ZGObZMK04KmWljKX8jky1UQ2claFLLLokR9XupsHqB4tGyKxt6jRW4RAX"
}

let token;
let skWidget;
let idTokenClaims;

window.onload = async () => {
    console.log("onload");
    await getToken();
    skWidget = document.getElementsByClassName("skWidget")[0];
    showWidget(props.loginPolicyId, successCallback, errorCallback, onCloseModal);
}

async function logout() {
    console.log("logout");
    idTokenClaims = null;
    updateUI(false);
}

async function getToken() {
    console.log("getToken");

    const url = "https://api.singularkey.com/v1/company/" + props.companyId + "/sdkToken";
    let response = await fetch(url, {
        method: "GET",
        headers: {
            "X-SK-API-KEY": props.apiKey
        }
    });

    token = await response.json();
    console.log(token);
}

async function showWidget(policyId, successCallback, errorCallback, onCloseModal, parameters) {
    console.log("showWidget");
    let widgetConfig = {
        config: {
            method: "runFlow",
            apiRoot: "https://api.singularkey.com/v1",
            accessToken: token.access_token,
            companyId: props.companyId,
            policyId: policyId,
            parameters: parameters
        },
        useModal: true,
        successCallback,
        errorCallback,
        onCloseModal
    };

    singularkey.skRenderScreen(skWidget, widgetConfig);
}


function successCallback(response) {
    console.log("successCallback");
    console.log(response);
    singularkey.cleanup(skWidget);
    idTokenClaims = response.additionalProperties;
}

function errorCallback(error) {
    console.log("errorCallback");
    console.log(error);
    singularkey.cleanup(skWidget);
}

function onCloseModal() {
    console.log("onCloseModal");
    singularkey.cleanup(skWidget)
}