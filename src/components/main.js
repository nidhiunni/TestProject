import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import { Button, useMediaQuery } from '@material-ui/core';
import Box from '@mui/material/Box';
import Typography from '@material-ui/core/Typography';
import SignatureCanvas from 'react-signature-canvas'
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CircularProgress from '@mui/material/CircularProgress';
import SimpleReactValidator from "simple-react-validator";
import Webcam from "react-webcam";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
// import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
// import Icon from '@mui/material/Icon';
//import "../style.css"
import CardHeader from '@mui/material/CardHeader';
import Grid from '@material-ui/core/Grid';
import { useState, useEffect } from 'react';
import Styles from './Styles'
import { Form, Field } from 'react-final-form'
import ImageUploader from "react-images-upload";
//import {getMuiTheme,MuiThemeProvider} from 'material-ui/styles'
import Swal from "sweetalert2";
import { FORM_ERROR } from 'final-form'
import { useSelector, useDispatch } from 'react-redux'
import getPersonalList from './actions/getPersonalInfo'
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
const useStyles = makeStyles((theme) => ({
  rootA: {
    width: '100%',
    //backgroundColor:"#FFFFFF"
  },
  root: {

  },
  stepIconRoot: {
    "&. MuiStepIcon-root.MuiStepIcon-active": {
      color: "purple"
    },

  },


  button: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  icon: {
    color: "red"
  },
}));

// const styles = theme => ({
//   icon: {
//     color: "red !important"
//   },
// });

function getSteps() {
  return ['Step 1', 'Step 2', 'Step 3'];
}



export default function Main() {
  const classes = useStyles();
  const [, forceUpdate] = React.useState()
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [loader, setLoader] = React.useState(false);
  const simpleValidator = React.useRef(new SimpleReactValidator())
  //const [completed, setCompleted] = React.useState({});
  const [data, setData] = React.useState({ profileImage: [], signature: "" })
  const [file, setFile] = React.useState(null)
  const [url, setUrl] = React.useState(null);
  const [isCaptureEnable, setCaptureEnable] = React.useState(false);
  const [isstep0, setisstep0] = React.useState(false);
  const [isstep1, setisstep1] = React.useState(false);
  const sigCanvas = React.createRef();
  const videoConstraints = {
    width: 720,
    height: 360,
    facingMode: "user"
  };
  //   const muiTheme = getMuiTheme({
  //     stepper: {
  //         iconColor: 'green' // or logic to change color
  //     }
  // })
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();

    if (imageSrc) {
      setUrl(imageSrc);
      setFile(imageSrc)
      setData({ ...data, profileImage: imageSrc })
      //console.log("imageSrc",imageSrc)
    }
  },
    [webcamRef]
  );


  const dispatch = useDispatch();
  const steps = getSteps();
  const dataPerson = useSelector((state) => state.addDetails)
  const officeData = useSelector((state) => state.addOffice)
  //const sagaData = useSelector((state) => state.getPersonal)
  //console.log("saggares", sagaData)
  //setData(dataPerson)
  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };




  //console.log("img",data)


  const onSubmit0 = async values => {
    setLoader(true)
    dispatch({ type: "ADD_PROFILE", payload: values })
    localStorage.setItem("personalInfo", JSON.stringify(values))
    const savedata = JSON.parse(localStorage.getItem("personalInfo"))
    //console.log("savedata",savedata)
    setLoader(false)
    setisstep0(true)
    handleComplete()
    handleNext()

  }
  const onSubmit1 = async values => {
    setLoader(true)
    dispatch({ type: "ADD_OFFICE", payload: values })
    localStorage.setItem("bankinfo", JSON.stringify(values))
    const savedata2 = JSON.parse(localStorage.getItem("bankinfo"))
    setLoader(false)
    handleComplete()
    handleNext()
    setisstep1(true)

  }
  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
    if (activeStep == 1) {

    }

  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const finishFun = () => {
    setLoader(true)
    //console.log("data,,,",data,completed)
    localStorage.setItem("finalform", JSON.stringify(data))
    const finalform = JSON.parse(localStorage.getItem("finalform"))
    setLoader(false)
    handleComplete()
    successAlert()
  }
  const successAlert = () => {
    Swal.fire({
      title: "success",
      text: "You application has been submitted",
      icon: "success"
    }).then(() => {
      handleReset()

    });

    // or Swal.fire( 'Good job!','You clicked the button','success');
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
    localStorage.clear()
    window.location.reload()

  };
  useEffect(() => {
    //dispatch({ type: "GET_PERSONAL" });
    dispatch(getPersonalList())
    const savedata2 = JSON.parse(localStorage.getItem("bankinfo"))
    dispatch({ type: "ADD_OFFICE", payload: savedata2 })
    const savedata = JSON.parse(localStorage.getItem("personalInfo"))
    dispatch({ type: "ADD_PROFILE", payload: savedata })
    //dispatch()

  }, [])
  const onDrop = (pictureFiles, pictureDataURLs) => {
    let imgdata = data.profileImage
    setFile(pictureDataURLs)
    imgdata.push(pictureFiles)
    setData({ ...data, profileImage: pictureFiles })

    // this.setState({
    //     pictures: pictureFiles
    // });
  }



  //dispatch({ type: "ADD_PROFILE"})
  return (
    <div className={classes.root}>
      <div className={classes.rootA}>
        <AppBar position="static" style={{ background: '#FFFFFF' }}>
          <Toolbar >



            <Typography style={{ color: 'black' }} variant="h5" noWrap>
              {activeStep == 0 && "Personal Info"}
              {activeStep == 1 && "Office Details"}
              {activeStep == 2 && "Confirmation page"}


            </Typography>


          </Toolbar>
          <div>
            <Box style={{ background: "#FD523F", display: "flex", width: "30%", marginLeft: "70%", marginTop: "-5%", borderBottomLeftRadius: "20Px" }}>
              <IconButton
                size="large"
                aria-label="display more actions"
                edge="end"
                color="inherit"
              >
                {"Input"}<MenuIcon style={{ paddingLeft: "20px" }} />
              </IconButton>
            </Box>
          </div>

          {/* <MuiThemeProvider muiTheme={muiTheme}> */}
          <Stepper nonLinear activeStep={activeStep} className={classes.root}>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepButton onClick={handleStep(index)} completed={completed[index]}
                //   StepIconProps={{

                // StepIconProps= {{ classes: { root: classes.stepIconRoot } }}

                //     "MuiStepIcon-root.MuiStepIcon-active": {
                //           color: "pink"
                //         }, 

                // }}
                >
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
          {/* </MuiThemeProvider>    */}

        </AppBar>



        <div>
          {allStepsCompleted() ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={handleReset}>OK</Button>
            </div>
          ) : (
            <div>
              <Typography className={classes.instructions}>
                {activeStep == 0 &&

                  <Styles>
                    <div >
                      <Form

                        onSubmit={onSubmit0}
                        initialValues={dataPerson.data}
                        validate={values => {
                          //console.log("value",values)
                          const errors = {}
                          if (!values.name) {
                            errors.name = 'Required'
                          }
                          if (!values.email) {
                            errors.email = 'Required'
                          }
                          if (!values.mobileNumber) {
                            errors.mobileNumber = 'Required'
                          }
                          if (!values.address1) {
                            errors.address1 = 'Required'
                          }
                          if (!values.address2) {
                            errors.address2 = 'Required'
                          }
                          if (!values.address3) {
                            errors.address3 = 'Required'
                          }

                          return errors
                        }}
                        render={({
                          submitError,
                          handleSubmit,
                          form,
                          submitting,

                          pristine,
                          values
                        }) => (
                          <form onSubmit={handleSubmit}>
                            <Field name="name">
                              {({ input, meta }) => (
                                <div>
                                  <label>Name</label>
                                  <input {...input} type="text" />
                                  {(meta.error || meta.submitError) && meta.touched && (
                                    <span>{meta.error || meta.submitError}</span>
                                  )}
                                </div>
                              )}
                            </Field>
                            <Field name="email">
                              {({ input, meta }) => (
                                <div>
                                  <label>Email</label>
                                  <input {...input} type="email" />
                                  {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                              )}
                            </Field>
                            <Field name="mobileNumber">
                              {({ input, meta }) => (
                                <div>
                                  <label>Mobile Number</label>
                                  <input {...input} type="number" onChange={(e) => {
                                    input.onChange(e, console.log("e", e.target));
                                  }} />
                                  {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                              )}
                            </Field>
                            <Field name="address1">
                              {({ input, meta }) => (
                                <div>
                                  <label>Address Line 1</label>
                                  <input {...input} type="text" />
                                  {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                              )}
                            </Field>
                            <Field name="address2">
                              {({ input, meta }) => (
                                <div>
                                  <label>Address Line 2</label>
                                  <input {...input} type="text" />
                                  {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                              )}
                            </Field>
                            <Field name="address3">
                              {({ input, meta }) => (
                                <div>
                                  <label>Address Line 3</label>
                                  <input {...input} type="text" />
                                  {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                              )}
                            </Field>
                            {submitError && <div className="error">{submitError}</div>}
                            <div className="buttons">
                              <button type="submit" disabled={submitting}>
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                {/* Next */}
                                {loader && <CircularProgress />}
                              </button>

                            </div>

                          </form>
                        )}
                      />
                    </div>
                  </Styles>
                }
                {activeStep == 1 &&
                  <Styles>
                    <div>
                      <Form
                        onSubmit={onSubmit1}
                        initialValues={officeData.data}
                        validate={values => {
                          console.log("value", values)
                          const errors = {}
                          if (!values.buidingName) {
                            errors.buidingName = 'Required'
                          }
                          if (!values.city) {
                            errors.city = 'Required'
                          }
                          if (!values.landlineNumber) {
                            errors.landlineNumber = 'Required'
                          }
                          if (!values.address1) {
                            errors.address1 = 'Required'
                          }
                          if (!values.address2) {
                            errors.address2 = 'Required'
                          }
                          if (!values.poBoxNumber) {
                            errors.poBoxNumber = 'Required'
                          }

                          return errors
                        }}
                        render={({
                          submitError,
                          handleSubmit,
                          form,
                          submitting,

                          pristine,
                          values
                        }) => (
                          <form onSubmit={handleSubmit}>
                            <Field name="buidingName">
                              {({ input, meta }) => (
                                <div>
                                  <label>Buiding Name</label>
                                  <input {...input} type="text" />
                                  {(meta.error || meta.submitError) && meta.touched && (
                                    <span>{meta.error || meta.submitError}</span>
                                  )}
                                </div>
                              )}
                            </Field>
                            <Field name="city">
                              {({ input, meta }) => (
                                <div>
                                  <label>City</label>
                                  <input {...input} type="text" />
                                  {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                              )}
                            </Field>
                            <Field name="landlineNumber">
                              {({ input, meta }) => (
                                <div>
                                  <label>landline Number</label>
                                  <input {...input} type="number" />
                                  {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                              )}
                            </Field>
                            <Field name="address1">
                              {({ input, meta }) => (
                                <div>
                                  <label>Address Line 1</label>
                                  <input {...input} type="text" />
                                  {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                              )}
                            </Field>
                            <Field name="address2">
                              {({ input, meta }) => (
                                <div>
                                  <label>Address Line 2</label>
                                  <input {...input} type="text" />
                                  {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                              )}
                            </Field>
                            <Field name="poBoxNumber">
                              {({ input, meta }) => (
                                <div>
                                  <label>PO Box Number</label>
                                  <input {...input} type="number" />
                                  {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                              )}
                            </Field>
                            {submitError && <div className="error">{submitError}</div>}
                            {/* <div>
                                 
                            </div> */}
                            <div className="buttons">
                              <button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                className={classes.backButton}
                              >
                                Back
                              </button>
                              <button type="submit" disabled={submitting}>
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                {/* Next */}
                              </button>

                            </div>

                          </form>
                        )}
                      />
                    </div>
                  </Styles>}
                {activeStep == 2 &&
                  <Styles>
                    <div>
                      <form>
                        <div className="row">
                          <div className="col-md-4">
                            {Object.values(dataPerson.data).map(item =>
                              <div>
                                <label>{item}</label>
                              </div>
                            )}
                          </div>
                          <div className="col-md-4">
                            {Object.values(officeData.data).map(item =>


                              <div>
                                <label>{item}</label>

                              </div>


                            )}
                          </div>
                          <div className="col-md-4">
                            <div style={{
                              display: "flex",

                              border: "1px dashed #ccc",

                            }}>

                              {data.profileImage.length == 0 && url == null && <ImageUploader
                                withIcon={true}
                                withPreview={true}
                                singleImage={true}
                                // icon={<AccountBoxOutlinedIcon />} 
                                label=""

                                // <Icon />
                                buttonText={data.profileImage.length == 0 ? ("Upload Images") : (null)}
                                onChange={onDrop}
                                imgExtension={[".jpeg", ".gif", ".png", ".gif", ".svg"]}
                                maxFileSize={1048576}
                                fileSizeError=" file size is too big"
                              />}
                              {data.profileImage.length != 0 &&
                                <div>
                                  <img src={file} width="100"></img>
                                  <a onClick={() => { setData({ ...data, profileImage: [] }); setFile(null); setUrl(null) }} >Remove Image</a>

                                </div>

                              }

                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  textAlign: "left",
                                  marginBottom: "5px"
                                }}
                              >

                                {isCaptureEnable || (
                                  <CameraAltIcon onClick={() => setCaptureEnable(true)} style={{ fontSize: '300%' }} />
                                  // <button onClick={() => setCaptureEnable(true)}>Use Webcam</button> style={{fontSize: '200%'}}
                                )}
                                {isCaptureEnable && (
                                  <>
                                    <div>
                                      <button onClick={() => setCaptureEnable(false)}>End</button>
                                    </div>
                                    <div>
                                      <Webcam
                                        audio={false}
                                        width={350}
                                        height={360}
                                        ref={webcamRef}
                                        //screenshotFormat="image/jpeg"
                                        videoConstraints={videoConstraints}
                                      />
                                    </div>

                                    <Button onClick={capture}>Capture photo</Button>
                                  </>
                                )}


                              </div>
                            </div>
                            <div className="row" style={{
                              paddingTop: "30px",
                              textAlign: "left",
                            }}>

                              <div style={{ width: 300, height: 150, border: "1px dashed black" }}>
                                <SignatureCanvas ref={sigCanvas} penColor="#000" />
                              </div>
                              <Button style={{ maxWidth: '120px', maxHeight: '30px', fontSize: "10px" }} onClick={() => setData({ ...data, signature: sigCanvas.current.toDataURL() })}>Save Signature</Button>
                              <Button style={{ maxWidth: '40px', maxHeight: '30px', fontSize: "10px" }} onClick={() => { setData({ ...data, signature: "" }); sigCanvas.current.clear() }}>Cleare</Button>

                            </div>
                          </div>


                        </div>
                        <div className="buttons">
                          <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            className={classes.backButton}
                          >
                            Back
                          </Button>
                          <Button style={{ backgroundColor: "#FD523F" }} disabled={!isstep0 && !isstep1} onClick={finishFun}>
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}

                          </Button>

                        </div>
                      </form>


                    </div>
                  </Styles>}
              </Typography>


            </div>
          )}
        </div>
      </div>
    </div>
  );
}
