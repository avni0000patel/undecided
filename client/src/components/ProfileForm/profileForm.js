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
            // textAlign: 'center',
            width: collapsed ? 'calc(100% - 78px)' : 'calc(100% - 268px)',
        },
        infoContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
        },
        leftContainer: {
            float: 'left',
            display: 'flex',
            flexDirection: 'column',
            margin: '0px 25px 0px 0px',
        },
        avatarSubmit: {
            backgroundColor: '#A4D9B1',
            border: '1px solid white',
            borderRadius: '15px',
            margin: '0px 0px 25px 0px',
            padding: '25px',
            position: 'relative',
        },
        avatarEdit: {
            position: 'absolute',
            right: '50px',
            zIndex: 1,
        },
        avatarPreview: {
            border: '6px solid #F8F8F8',
            borderRadius: '100%',
            boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            justifyContent: 'center',
            height: '192px',
            overflow: 'hidden',
            position: 'relative',
            width: '192px',
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
        bioSubmit: {
            backgroundColor: '#A4D9B1',
            border: '1px solid white',
            borderRadius: '15px',
            margin: '0px 0px 25px 0px',
            padding: '25px',
            position: 'relative'
        },
        bioInfo: {
            marginBottom: '10px',
        },
        bioLabel: {
            fontSize: '25px',
            fontWeight: 600,
        },
        bioInput: {
            backgroundColor: 'transparent',
            border: 'none',
            fontFamily: 'Space Mono',
            fontStyle: 'normal',
            fontWeight: 400,
            height: '100%',
            minHeight: '200px',
            minWidth: '300px',
            padding: '5px 15px 5px 15px',
            width: '100%',
        },
        rightContainer: {
            float: 'right',
            display: 'flex',
            flexDirection: 'column',
            margin: '0px 25px 0px 0px',
        },
        userSubmit: {
            backgroundColor: '#A4D9B1',
            border: '1px solid white',
            borderRadius: '15px',
            fontSize: '25px',
            fontWeight: 600,
            margin: '0px 0px 25px 0px',
            padding: '25px',
        },
        socialSubmit: {
            backgroundColor: '#A4D9B1',
            border: '1px solid white',
            borderRadius: '15px',
            fontSize: '25px',
            fontWeight: 600,
            padding: '25px',
            position: 'relative',
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
        profileInfo: {
            alignItems: 'center',
            display: 'flex',
            marginBottom: '10px',
        },
        profileLabel: {
            marginRight: '10px',
            minWidth: '100px',
        },
        profileInput: {
            backgroundColor: 'transparent',
            border: 'none',
            fontFamily: 'Space Mono',
            fontStyle: 'normal',
            fontWeight: 400,
            padding: '5px 15px 5px 15px'
        }
    }

    const dataProfiles = useQuery(QUERY_PROFILES);
    const data = useQuery(QUERY_ME);

    useEffect(() => {
        console.log(dataProfiles)
        console.log(data);
    }, [dataProfiles, data]);

    const [image, setImage] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");
    const [location, setLocation] = useState("");
    const [twitter, setTwitter] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [instagram, setInstagram] = useState("");

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
                    image,
                    email,
                    bio,
                    location,
                    twitter,
                    linkedin,
                    instagram,
                },
            });

        } catch (error) {
            throw error;
        }
    };

    const handlePhoto = (event) => {
        console.log(event.target.files);
        setImage(URL.createObjectURL(event.target.files[0]));
    };

    const handleEmailChange = (event) => {
        const { value } = event.target;
        setEmail(value);
    }

    const handleBioChange = (event) => {
        const { value } = event.target;
        setBio(value);
    }

    const handleLocationChange = (event) => {
        const { value } = event.target;
        setLocation(value);
    }

    const handleTwitterChange = (event) => {
        const { value } = event.target;
        setTwitter(value);
    }

    const handleLinkedinChange = (event) => {
        const { value } = event.target;
        setLinkedin(value);
    }

    const handleInstagramChange = (event) => {
        const { value } = event.target;
        setInstagram(value);
    }

    return (
        <div className="profileForm" style={styles.profileForm}>
            <div className="infoContainer" style={styles.infoContainer}>
                <form
                    className="profileFormSubmit"
                    onSubmit={handleFormSubmit}
                    style={styles.profileFormSubmit}
                >
                    <div className="leftContainer" style={styles.leftContainer}>
                        <div className="avatarSubmit" style={styles.avatarSubmit}>
                            <div className="avatarEdit" style={styles.avatarEdit}>
                                <input accept=".png, .jpg, .jpeg" className="imageUpload" id="imageUpload" onChange={handlePhoto} style={styles.imageUpload} type="file" />
                                <label className="label" htmlFor="imageUpload" style={styles.label}></label>
                            </div>
                            <div className="avatarPreview" style={styles.avatarPreview}>
                                <img alt="" className="imagePreview" src={image} style={styles.imagePreview} />
                            </div>
                            {data && data.data && data.data.me && (
                                <div className="name" style={styles.name}>{data.data.me.first_name} {data.data.me.last_name}</div>
                            )}
                        </div>
                        <div className="bioSubmit" style={styles.bioSubmit}>
                            <div className="bioInfo" style={styles.bioInfo}>
                                <div className="bioLabel" style={styles.bioLabel}>Bio:</div>
                                <textarea className="bioInput" name="bio" onChange={handleBioChange} style={styles.bioInput} type="text" value={dataProfiles.data && dataProfiles.data.profiles.length > 0 ? dataProfiles.data.profiles[dataProfiles.data.profiles.length - 1].bio : bio} />
                            </div>
                        </div>
                    </div>
                    <div className="rightContainer" style={styles.rightContainer}>
                        <div className="userSubmit" style={styles.userSubmit}>
                            <div className="profileInfo" style={styles.profileInfo}>
                                <div className="profileLabel" style={styles.profileLabel}>Location:</div>
                                <input className="profileInput" name="location" onChange={handleLocationChange} style={styles.profileInput} type="text" value={dataProfiles.data && dataProfiles.data.profiles.length > 0 ? dataProfiles.data.profiles[dataProfiles.data.profiles.length - 1].location : location} />
                            </div>
                        </div>
                        <div className="socialSubmit" style={styles.socialSubmit}>
                            <div className="profileInfo" style={styles.profileInfo}>
                                <div className="profileLabel" style={styles.profileLabel}>Email:</div>
                                <input className="profileInput" name="email" onChange={handleEmailChange} style={styles.profileInput} type="text" value={dataProfiles.data && dataProfiles.data.profiles.length > 0 ? dataProfiles.data.profiles[dataProfiles.data.profiles.length - 1].email : email} />
                            </div>
                            <div className="profileInfo" style={styles.profileInfo}>
                                <div className="profileLabel" style={styles.profileLabel}>Twitter:</div>
                                <input className="profileInput" name="twitter" onChange={handleTwitterChange} style={styles.profileInput} type="text" value={dataProfiles.data && dataProfiles.data.profiles.length > 0 ? dataProfiles.data.profiles[dataProfiles.data.profiles.length - 1].twitter : twitter} />
                            </div>
                            <div className="profileInfo" style={styles.profileInfo}>
                                <div className="profileLabel" style={styles.profileLabel}>LinkedIn:</div>
                                <input className="profileInput" name="linkedin" onChange={handleLinkedinChange} style={styles.profileInput} type="text" value={dataProfiles.data && dataProfiles.data.profiles.length > 0 ? dataProfiles.data.profiles[dataProfiles.data.profiles.length - 1].linkedin : linkedin} />
                            </div>
                            <div className="profileInfo" style={styles.profileInfo}>
                                <div className="profileLabel" style={styles.profileLabel}>Instagram:</div>
                                <input className="profileInput" name="instagram" onChange={handleInstagramChange} style={styles.profileInput} type="text" value={dataProfiles.data && dataProfiles.data.profiles.length > 0 ? dataProfiles.data.profiles[dataProfiles.data.profiles.length - 1].instagram : instagram} />
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
