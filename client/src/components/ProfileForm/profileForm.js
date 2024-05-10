import { useMutation, useQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import { ADD_PROFILE } from '../../utils/mutations';
import { QUERY_PROFILES, QUERY_ME } from '../../utils/queries';
import './profileForm.css';

const ProfileForm = ({ collapsed }) => {
    const styles = {
        profileForm: {
            alignItems: 'center',
            color: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
            float: 'right',
            fontFamily: 'Indie Flower',
            fontStyle: 'normal',
            fontWeight: 400,
            justifyContent: 'flex-start',
            padding: '2rem 2rem',
            width: collapsed ? 'calc(100% - 78px)' : 'calc(100% - 268px)',
        },
        box1: {
            backgroundColor: '#A4D9B1',
            border: '1px solid white',
            borderRadius: '15px',
            margin: '0px 0px 25px 0px',
            padding: '25px',
            position: 'relative',
        },
        avatar: {
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
        },
        avatarEdit: {
            position: 'relative',
            left: 170,
            bottom: 70,
            zIndex: 1,
        },
        imageUpload: {
            display: 'none',
        },
        label: {
            background: '#FFFFFF',
            border: '1px solid white',
            borderRadius: '100%',
            boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.12)',
            cursor: 'pointer',
            display: 'inline-block',
            fontWeight: 'normal',
            height: '34px',
            marginBottom: 0,
            transition: 'all .2s ease-in-out',
            width: '34px',
        },
        avatarPreview: {
            borderRadius: '100%',
            display: 'flex',
            justifyContent: 'center',
            height: '192px',
            overflow: 'hidden',
            position: 'relative',
            width: '192px',
        },
        imagePreview: {
            backgroundImage: `url("https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png")`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            borderRadius: '100%',
            display: 'flex',
            justifyContent: 'center',
            height: '100%',
            objectFit: 'cover',
            width: '100%',
        },
        name: {
            display: 'flex',
            fontSize: '36px',
            fontWeight: 700,
            justifyContent: 'center'
        },
        bioInfo: {
            marginBottom: '10px',
        },
        bioLabel: {
            fontSize: '20px',
            fontWeight: 600,
        },
        bioInput: {
            backgroundColor: 'transparent',
            border: 'none',
            color: '#FFFFFF',
            fontFamily: 'Space Mono',
            fontStyle: 'normal',
            fontWeight: 400,
            height: '100%',
            minHeight: '200px',
            // minWidth: '300px',
            padding: '5px 15px 5px 15px',
            width: '100%',
        },
        socialInfo: {
            alignItems: 'center',
            display: 'flex',
            marginBottom: '10px',
        },
        socialLabel: {
            fontSize: '20px',
            fontWeight: 600,
            marginRight: '10px',
            minWidth: '125px',
        },
        socialInput: {
            backgroundColor: 'transparent',
            border: 'none',
            color: '#FFFFFF',
            fontFamily: 'Space Mono',
            fontStyle: 'normal',
            fontWeight: 400,
            // minWidth: '280px',
            padding: '5px 15px 5px 15px'
        },
        profileSubmitContainer: {
            bottom: '10px',
            position: 'absolute',
            right: '10px',
        },
        profileSubmit: {
            border: '1px solid black',
            margin: '0 auto',
            marginTop: '10px',
            textAlign: 'center',
        },
    }

    const dataProfiles = useQuery(QUERY_PROFILES);
    const data = useQuery(QUERY_ME);

    useEffect(() => {
        console.log(dataProfiles)
        console.log(data);
    }, [dataProfiles, data]);

    const [bio, setBio] = useState("");
    const [email, setEmail] = useState("");
    const [facebook, setFacebook] = useState("");
    const [image, setImage] = useState("");
    const [instagram, setInstagram] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [location, setLocation] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [pinterest, setPinterest] = useState("");
    const [twitter, setTwitter] = useState("");

    const [addProfile] = useMutation(ADD_PROFILE, {
        update(cache, { data: { addProfile } }) {
            try {
                const { profiles } = cache.readQuery({ query: QUERY_PROFILES });

                cache.writeQuery({
                    query: QUERY_PROFILES,
                    data: { profiles: [addProfile, ...profiles] },
                });
            } catch (error) {
                throw error;
            }

            // update me object's cache
            try {
                const { me } = cache.readQuery({ query: QUERY_ME });

                cache.writeQuery({
                    query: QUERY_ME,
                    data: { me: { ...me, profiles: [...me.profiles, addProfile] } },
                });
            } catch (error) {
                throw error;
            }
        },
    });

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addProfile({
                variables: {
                    bio,
                    email,
                    facebook,
                    image,
                    instagram,
                    linkedin,
                    location,
                    phoneNumber,
                    pinterest,
                    twitter
                },
            });

        } catch (error) {
            throw error;
        }
    };

    const handleBioChange = (event) => {
        const { value } = event.target;
        setBio(value);
    }

    const handleEmailChange = (event) => {
        const { value } = event.target;
        setEmail(value);
    }

    const handleFacebookChange = (event) => {
        const { value } = event.target;
        setFacebook(value);
    }

    const handleImageChange = (event) => {
        console.log(event.target.files);
        setImage(URL.createObjectURL(event.target.files[0]));
    };

    const handleInstagramChange = (event) => {
        const { value } = event.target;
        setInstagram(value);
    }

    const handleLinkedinChange = (event) => {
        const { value } = event.target;
        setLinkedin(value);
    }

    const handleLocationChange = (event) => {
        const { value } = event.target;
        setLocation(value);
    }

    const handlePhoneNumberChange = (event) => {
        const { value } = event.target;
        setPhoneNumber(value);
    }

    const handlePinterestChange = (event) => {
        const { value } = event.target;
        setPinterest(value);
    }

    const handleTwitterChange = (event) => {
        const { value } = event.target;
        setTwitter(value);
    }

    return (
        <div className="profileForm" style={styles.profileForm}>
            <div className="infoContainer container" style={styles.infoContainer}>
                <form
                    className="profileFormSubmit"
                    onSubmit={handleFormSubmit}
                    style={styles.profileFormSubmit}
                >
                    <div className="box1 row align-items-start no-gutters" style={styles.box1}>
                        <div className="col-sm-12 col-lg-6" >
                            <div className="avatar" style={styles.avatar}>
                                <div className="avatarEdit" style={styles.avatarEdit}>
                                    <input accept=".png, .jpg, .jpeg" className="imageUpload" id="imageUpload" onChange={handleImageChange} style={styles.imageUpload} type="file" />
                                    <label className="label" htmlFor="imageUpload" style={styles.label}></label>
                                </div>
                                <div className="avatarPreview" style={styles.avatarPreview}>
                                    <img alt="" className="imagePreview" src={image} style={styles.imagePreview} />
                                </div>
                            </div>
                            {data && data.data && data.data.me && (
                                <div className="name" style={styles.name}>{data.data.me.first_name} {data.data.me.last_name}</div>
                            )}
                        </div>
                        <div className="col-sm-12 col-lg-6">
                            <div className="bioInfo" style={styles.bioInfo}>
                                <div className="bioLabel" style={styles.bioLabel}>Bio:</div>
                                <textarea className="bioInput" name="bio" onChange={handleBioChange} style={styles.bioInput} type="text" value={dataProfiles.data && dataProfiles.data.profiles.length > 0 ? dataProfiles.data.profiles[dataProfiles.data.profiles.length - 1].bio : bio} />
                            </div>
                        </div>
                    </div>
                    <div className="box1 row align-items-start no-gutters" style={styles.box1}>
                        <div className="col-sm-12 col-lg-6">
                            <div className="socialInfo" style={styles.socialInfo}>
                                <div className="socialLabel" style={styles.socialLabel}>Location:</div>
                                <input className="socialInput" name="location" onChange={handleLocationChange} style={styles.socialInput} type="text" value={dataProfiles.data && dataProfiles.data.profiles.length > 0 ? dataProfiles.data.profiles[dataProfiles.data.profiles.length - 1].location : location} />
                            </div>
                            <div className="socialInfo" style={styles.socialInfo}>
                                <div className="socialLabel" style={styles.socialLabel}>Email:</div>
                                <input className="socialInput" name="email" onChange={handleEmailChange} style={styles.socialInput} type="text" value={dataProfiles.data && dataProfiles.data.profiles.length > 0 ? dataProfiles.data.profiles[dataProfiles.data.profiles.length - 1].email : email} />
                            </div>
                            <div className="socialInfo" style={styles.socialInfo}>
                                <div className="socialLabel" style={styles.socialLabel}>Phone Number:</div>
                                <input className="socialInput" name="phoneNumber" onChange={handlePhoneNumberChange} style={styles.socialInput} type="text" value={dataProfiles.data && dataProfiles.data.profiles.length > 0 ? dataProfiles.data.profiles[dataProfiles.data.profiles.length - 1].phoneNumber : phoneNumber} />
                            </div>
                        </div>
                        <div className="col-sm-12 col-lg-6">
                            {/* <div className="socialInfo" style={styles.socialInfo}>
                                <div className="socialLabel" style={styles.socialLabel}>Twitter:</div>
                                <textarea className="socialInput" name="twitter" onChange={handleTwitterChange} style={styles.socialInput} type="text" value={dataProfiles.data && dataProfiles.data.profiles.length > 0 ? dataProfiles.data.profiles[dataProfiles.data.profiles.length - 1].twitter : twitter} />
                            </div>
                            <div className="socialInfo" style={styles.socialInfo}>
                                <div className="socialLabel" style={styles.socialLabel}>LinkedIn:</div>
                                <textarea className="socialInput" name="linkedin" onChange={handleLinkedinChange} style={styles.socialInput} type="text" value={dataProfiles.data && dataProfiles.data.profiles.length > 0 ? dataProfiles.data.profiles[dataProfiles.data.profiles.length - 1].linkedin : linkedin} />
                            </div> */}
                            <div className="socialInfo" style={styles.socialInfo}>
                                <div className="socialLabel" style={styles.socialLabel}>Instagram:</div>
                                <input className="socialInput" name="instagram" onChange={handleInstagramChange} style={styles.socialInput} type="text" value={dataProfiles.data && dataProfiles.data.profiles.length > 0 ? dataProfiles.data.profiles[dataProfiles.data.profiles.length - 1].instagram : instagram} />
                            </div>
                            <div className="socialInfo" style={styles.socialInfo}>
                                <div className="socialLabel" style={styles.socialLabel}>Pinterest:</div>
                                <input className="socialInput" name="pinterest" onChange={handlePinterestChange} style={styles.socialInput} type="text" value={dataProfiles.data && dataProfiles.data.profiles.length > 0 ? dataProfiles.data.profiles[dataProfiles.data.profiles.length - 1].pinterest : pinterest} />
                            </div>
                            <div className="socialInfo" style={styles.socialInfo}>
                                <div className="socialLabel" style={styles.socialLabel}>Facebook:</div>
                                <input className="socialInput" name="facebook" onChange={handleFacebookChange} style={styles.socialInput} type="text" value={dataProfiles.data && dataProfiles.data.profiles.length > 0 ? dataProfiles.data.profiles[dataProfiles.data.profiles.length - 1].facebook : facebook} />
                            </div>
                        </div>
                    </div>
                    <div className="profileSubmitContainer" style={styles.profileSubmitContainer}>
                        <button className="profileSubmit" style={styles.profileSubmit} type="submit">
                            Submit
                        </button>
                    </div>
                </form >
            </div >
        </div >
    );
};

export default ProfileForm;
