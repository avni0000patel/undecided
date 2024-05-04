import { useMutation } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import { ADD_PROFILE } from '../../utils/mutations';
import { QUERY_PROFILES, QUERY_ME } from '../../utils/queries';
import './profileForm.css';

const ProfileForm = ({ collapsed }) => {
    const styles = {
        profileForm: {
            alignItems: 'center',
            color: "#FFFFFF",
            display: 'flex',
            flexDirection: 'column',
            float: 'right',
            fontFamily: "Indie Flower",
            fontStyle: "normal",
            fontWeight: 400,
            justifyContent: 'center',
            padding: '2rem 2rem',
            textAlign: 'center',
            width: collapsed ? 'calc(100% - 78px)' : 'calc(100% - 268px)',
        },
        infoContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
        },
        avatarSubmit: {
            marginRight: '25px',
            position: 'relative',
        },
        avatarEdit: {
            position: 'absolute',
            right: '12px',
            zIndex: 1,
        },
        avatarPreview: {
            border: '6px solid #F8F8F8',
            borderRadius: '100%',
            boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.1)',
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
            border: '1px solid transparent',
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
            height: '100%',
            objectFit: 'cover',
            width: '100%',
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
            flex: 1,
        }
    }

    const [image, setImage] = useState("");
    const [name, setName] = useState("");
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
                    name,
                    email,
                    bio,
                    location,
                    twitter,
                    linkedin,
                    instagram,
                },
            });
            // setImage("");
            // setName("");
            // setEmail("");
            // setBio("");
            // setLocation("");
            // setTwitter("");
            // setLinkedin("");
            // setInstagram("");

        } catch (error) {
            throw error;
        }
    };

    const handlePhoto = (event) => {
        console.log(event.target.files);
        setImage(URL.createObjectURL(event.target.files[0]));
    };

    const handleNameChange = (event) => {
        const { value } = event.target;
        setName(value);
    }

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
                    className="profileSubmit"
                    onSubmit={handleFormSubmit}
                    style={styles.profileSubmit}
                >
                    <div className="avatarSubmit" style={styles.avatarSubmit}>
                        <div className="avatarEdit" style={styles.avatarEdit}>
                            <input accept=".png, .jpg, .jpeg" className="imageUpload" id="imageUpload" onChange={handlePhoto} style={styles.imageUpload} type="file" />
                            <label className="label" htmlFor="imageUpload" style={styles.label}></label>
                        </div>
                        <div className="avatarPreview" style={styles.avatarPreview}>
                            <img alt="" className="imagePreview" src={image} style={styles.imagePreview} />
                        </div>
                    </div>
                    <div className="userSubmit" style={styles.userSubmit}>
                        <div className="profileInfo" style={styles.profileInfo}>
                            <div className="profileLabel" style={styles.profileLabel}>Name:</div>
                            <input className="profileInput" name="name" onChange={handleNameChange} style={styles.profileInput} type="text" value={name} />
                        </div>
                        <div className="profileInfo" style={styles.profileInfo}>
                            <div className="profileLabel" style={styles.profileLabel}>Email:</div>
                            <input className="profileInput" name="email" onChange={handleEmailChange} style={styles.profileInput} type="text" value={email} />
                        </div>
                        <div className="profileInfo" style={styles.profileInfo}>
                            <div className="profileLabel" style={styles.profileLabel}>Bio:</div>
                            <input className="profileInput" name="bio" onChange={handleBioChange} style={styles.profileInput} type="text" value={bio} />
                        </div>
                        <div className="profileInfo" style={styles.profileInfo}>
                            <div className="profileLabel" style={styles.profileLabel}>Location:</div>
                            <input className="profileInput" name="location" onChange={handleLocationChange} style={styles.profileInput} type="text" value={location} />
                        </div>
                        <div className="profileInfo" style={styles.profileInfo}>
                            <div className="profileLabel" style={styles.profileLabel}>Twitter:</div>
                            <input className="profileInput" name="twitter" onChange={handleTwitterChange} style={styles.profileInput} type="text" value={twitter} />
                        </div>
                        <div className="profileInfo" style={styles.profileInfo}>
                            <div className="profileLabel" style={styles.profileLabel}>LinkedIn:</div>
                            <input className="profileInput" name="linkedin" onChange={handleLinkedinChange} style={styles.profileInput} type="text" value={linkedin} />
                        </div>
                        <div className="profileInfo" style={styles.profileInfo}>
                            <div className="profileLabel" style={styles.profileLabel}>Instagram:</div>
                            <input className="profileInput" name="instagram" onChange={handleInstagramChange} style={styles.profileInput} type="text" value={instagram} />
                        </div>
                    </div>
                    <div className="profileSubmitContainer" style={styles.profileSubmitContainer}>
                        <button className="profileSubmit" style={styles.profileSubmit} type="submit">
                            Submit
                        </button>
                    </div>
                </form >
            </div>
        </div >
    );
};

export default ProfileForm;
