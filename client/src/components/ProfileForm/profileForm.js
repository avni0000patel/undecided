import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
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
        avatarUpload: {
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
        uploadImage: {
            border: '1px solid black',
            margin: '0 auto;',
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

    const [formData, setFormData] = useState({
        image: '',
        name: '',
        email: '',
        bio: '',
        location: '',
        socialMedia: {
            twitter: '',
            linkedin: '',
            instagram: '',
        },
    });

    const [image, setImage] = useState('');

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
                    ...formData,
                },
            });
            setImage('');
            setFormData({
                image: '',
                name: '',
                email: '',
                bio: '',
                location: '',
                socialMedia: {
                    twitter: '',
                    linkedin: '',
                    instagram: '',
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

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div className="profileForm" style={styles.profileForm}>
            <div className="infoContainer" style={styles.infoContainer}>
                <form
                    className="avatarUpload"
                    onSubmit={handleFormSubmit}
                    style={styles.avatarUpload}
                >
                    <div className="avatarEdit" style={styles.avatarEdit}>
                        <input accept=".png, .jpg, .jpeg" className="imageUpload" id="imageUpload" onChange={handlePhoto} style={styles.imageUpload} type="file" />
                        <label className="label" for="imageUpload" style={styles.label}></label>
                    </div>
                    <div className="avatarPreview" style={styles.avatarPreview}>
                        <img alt="" className="imagePreview" src={image} style={styles.imagePreview} />
                    </div>
                    <button className="uploadImage" style={styles.uploadImage} type="submit">
                        Upload
                    </button>
                </form>
                <form
                    className="profile-submit"
                    // onSubmit={handleFormSubmit2}
                    style={styles.profileSubmit}
                >
                    <div className="profileInfo" style={styles.profileInfo}>
                        <div className="profileLabel" style={styles.profileLabel}>Name:</div>
                        <input className="profileInput" name="name" onChange={handleChange} placeholder="Name" style={styles.profileInput} type="text" value={formData.name} />
                    </div>
                    <div className="profileInfo" style={styles.profileInfo}>
                        <div className="profileLabel" style={styles.profileLabel}>Email:</div>
                        <input className="profileInput" name="email" onChange={handleChange} placeholder="Email" style={styles.profileInput} type="email" value={formData.email} />
                    </div>
                    <div className="profileInfo" style={styles.profileInfo}>
                        <div className="profileLabel" style={styles.profileLabel}>Bio:</div>
                        <input className="profileInput" name="bio" onChange={handleChange} placeholder="Bio" style={styles.profileInput} type="bio" value={formData.bio} />
                    </div>
                    <div className="profileInfo" style={styles.profileInfo}>
                        <div className="profileLabel" style={styles.profileLabel}>Location:</div>
                        <input className="profileInput" name="location" onChange={handleChange} placeholder="Location" style={styles.profileInput} type="text" value={formData.location} />
                    </div>
                    <div className="profileInfo" style={styles.profileInfo}>
                        <div className="profileLabel" style={styles.profileLabel}>Twitter:</div>
                        <input className="profileInput" name="twitter" onChange={handleChange} placeholder="Twitter" style={styles.profileInput} type="text" value={formData.socialMedia.twitter} />
                    </div>
                    <div className="profileInfo" style={styles.profileInfo}>
                        <div className="profileLabel" style={styles.profileLabel}>LinkedIn:</div>
                        <input className="profileInput" name="linkedin" onChange={handleChange} placeholder="LinkedIn" style={styles.profileInput} type="text" value={formData.socialMedia.linkedin} />
                    </div>
                    <div className="profileInfo" style={styles.profileInfo}>
                        <div className="profileLabel" style={styles.profileLabel}>Instagram:</div>
                        <input className="profileInput" name="instagram" onChange={handleChange} placeholder="Instagram" style={styles.profileInput} type="text" value={formData.socialMedia.instagram} />
                    </div>
                </form >
            </div>
        </div >
    );
};

export default ProfileForm;
