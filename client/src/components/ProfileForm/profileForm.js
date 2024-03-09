import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

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
        infoBox: {
            border: '1px solid #ccc',
            borderRadius: '8px',
            marginBottom: '1rem',
            padding: '1rem',
            width: '300px',
        },
        avatarUpload: {
            position: 'relative',
        },
        avatarEdit: {
            position: 'absolute',
            right: '12px',
            zIndex: 1,
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
        avatarPreview: {
            border: '6px solid #F8F8F8',
            borderRadius: '100%',
            boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.1)',
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
            height: '100%',
            objectFit: 'cover',
            width: '100%',
        },
        uploadImage: {
            border: '1px solid black',
            margin: '0 auto;',
            marginTop: '10px',
            textAlign: 'center',
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
            <div style={styles.infoContainer}>
                <form
                    className="avatar-upload"
                    onSubmit={handleFormSubmit}
                    style={styles.avatarUpload}
                >
                    <div className="avatar-edit" style={styles.avatarEdit}>
                        <input id="imageUpload" type="file" className="imageUpload" onChange={handlePhoto} accept=".png, .jpg, .jpeg" style={styles.imageUpload} />
                        <label className="label" for="imageUpload" style={styles.label}></label>
                    </div>
                    <div className="avatar-preview" style={styles.avatarPreview}>
                        <img className="imagePreview" alt="" src={image} style={styles.imagePreview} />
                    </div>
                    <button className="uploadImage" type="submit" style={styles.uploadImage}>
                        Upload
                    </button>
                </form>
                <form
                    className="profile-submit"
                    // onSubmit={handleFormSubmit2}
                    style={styles.profileSubmit}
                >
                    <div>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
                    </div>
                    <div>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                    </div>
                    <div>
                        <input type="bio" name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" />
                    </div>
                    <div>
                        <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
                    </div>
                    <div>
                        <input type="text" name="twitter" value={formData.socialMedia.twitter} onChange={handleChange} placeholder="Twitter" />
                    </div>
                    <div>
                        <input type="text" name="linkedin" value={formData.socialMedia.linkedin} onChange={handleChange} placeholder="LinkedIn" />
                    </div>
                    <div>
                        <input type="text" name="instagram" value={formData.socialMedia.instagram} onChange={handleChange} placeholder="Instagram" />
                    </div>
                </form >
            </div>
        </div >
    );
};

export default ProfileForm;
