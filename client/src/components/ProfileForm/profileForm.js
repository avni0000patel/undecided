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
            display: collapsed ? 'flex' : 'none',
            flexDirection: 'column',
            float: 'right',
            fontFamily: 'Indie Flower',
            fontStyle: 'normal',
            fontWeight: 400,
            justifyContent: 'flex-start',
            padding: '2rem 2rem',
            width: collapsed ? 'calc(100% - 78px)' : 'auto',
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
            padding: '5px 15px 5px 15px',
        },
        profileSubmitContainer: {
            bottom: '25px',
            position: 'absolute',
            right: '25px',
        },
        profileSubmit: {
            backgroundColor: '#A4D9B1',
            border: '1px solid white',
            borderRadius: '15px',
            color: '#FFFFFF',
            fontSize: '36px',
            justifyContent: 'center',
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
    const [location, setLocation] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [pinterest, setPinterest] = useState("");

    useEffect(() => {
        console.log("bio:", bio);
        console.log("email:", email)
    }, [bio, email])

    useEffect(() => {
        if (dataProfiles.data && dataProfiles.data.profiles.length > 0) {
            const latestProfile = dataProfiles.data.profiles[dataProfiles.data.profiles.length - 1];
            setBio(latestProfile.bio);
            setEmail(latestProfile.email);
            setFacebook(latestProfile.facebook);
            setImage(latestProfile.image);
            setInstagram(latestProfile.instagram);
            setLocation(latestProfile.location);
            setPhoneNumber(latestProfile.phoneNumber);
            setPinterest(latestProfile.pinterest);
        }
    }, [dataProfiles]);

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
                    location,
                    phoneNumber,
                    pinterest,
                },
            });

        } catch (error) {
            throw error;
        }
    };

    const handleBioChange = (event) => {
        setBio(event.target);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target);
    }

    const handleFacebookChange = (event) => {
        setFacebook(event.target);
    }

    const handleImageChange = (event) => {
        console.log(event.target.files);
        setImage(URL.createObjectURL(event.target.files[0]));
    };

    const handleInstagramChange = (event) => {
        setInstagram(event.target);
    }

    const handleLocationChange = (event) => {
        setLocation(event.target);
    }

    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target);
    }

    const handlePinterestChange = (event) => {
        setPinterest(event.target);
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
                                <textarea className="bioInput" name="bio" onChange={handleBioChange} style={styles.bioInput} type="text" value={bio} />
                            </div>
                        </div>
                    </div>
                    <div className="box1 row align-items-start no-gutters" style={styles.box1}>
                        <div className="col-sm-12 col-lg-6">
                            <div className="socialInfo" style={styles.socialInfo}>
                                <div className="socialLabel" style={styles.socialLabel}>Location:</div>
                                <input className="socialInput" name="location" onChange={handleLocationChange} style={styles.socialInput} type="text" value={location} />
                            </div>
                            <div className="socialInfo" style={styles.socialInfo}>
                                <div className="socialLabel" style={styles.socialLabel}>Email:</div>
                                <input className="socialInput" name="email" onChange={handleEmailChange} style={styles.socialInput} type="text" value={email} />
                            </div>
                            <div className="socialInfo" style={styles.socialInfo}>
                                <div className="socialLabel" style={styles.socialLabel}>Phone Number:</div>
                                <input className="socialInput" name="phoneNumber" onChange={handlePhoneNumberChange} style={styles.socialInput} type="text" value={phoneNumber} />
                            </div>
                        </div>
                        <div className="col-sm-12 col-lg-6">
                            <div className="socialInfo" style={styles.socialInfo}>
                                <div className="socialLabel" style={styles.socialLabel}>Facebook:</div>
                                <input className="socialInput" name="facebook" onChange={handleFacebookChange} style={styles.socialInput} type="text" value={facebook} />
                            </div>
                            <div className="socialInfo" style={styles.socialInfo}>
                                <div className="socialLabel" style={styles.socialLabel}>Instagram:</div>
                                <input className="socialInput" name="instagram" onChange={handleInstagramChange} style={styles.socialInput} type="text" value={instagram} />
                            </div>
                            <div className="socialInfo" style={styles.socialInfo}>
                                <div className="socialLabel" style={styles.socialLabel}>Pinterest:</div>
                                <input className="socialInput" name="pinterest" onChange={handlePinterestChange} style={styles.socialInput} type="text" value={pinterest} />
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
