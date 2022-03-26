import React, { FunctionComponent } from 'react';
import styles from './Author.module.css';
import DefaultUser from '/public/img/default-user.png';
import Image from 'next/image';
import { UsersPermissionsUser } from '@customTypes/generated/graphql';
import Helpers from 'utils/helpers';

type AuthorProps = {
    data: UsersPermissionsUser;
};

const DataCyPrefix = 'AuthorComponent';

const Author: FunctionComponent<AuthorProps> = (props) => {
    const { data } = props;
    const isImagePresent = Boolean(data.avatar?.data?.attributes?.url);
    return (
        <article className={styles.container} data-cy={`${DataCyPrefix}Container`}>
            <div className={styles.imageContainer} data-cy={`${DataCyPrefix}ImageContainer`}>
                {isImagePresent ? (
                    <Image
                        src={Helpers.getImageURL(String(data.avatar?.data?.attributes?.url))}
                        data-cy={`${DataCyPrefix}Image`}
                        alt={`${data.username} image.`}
                        width={80}
                        height={100}
                    />
                ) : (
                    <Image
                        src={DefaultUser}
                        data-cy={`${DataCyPrefix}Image`}
                        alt="a default user image"
                        width={80}
                        height={100}
                    />
                )}
                <h3 className={styles.name} data-cy={`${DataCyPrefix}AuthorName`}>
                    {data.username}
                </h3>
                <p className={styles.bio} data-cy={`${DataCyPrefix}Bio`}>
                    {data.bio ?? 'Update your bio in your profile :)'}
                </p>
                <div className={styles.linkContainer} data-cy={`${DataCyPrefix}LinkContainer`}>
                    {data.twitterUrl && (
                        <a
                            className={styles.linkText}
                            href={data.twitterUrl}
                            data-cy={`${DataCyPrefix}TwitterLink`}
                        >
                            Twitter
                        </a>
                    )}
                    {data.linkedinUrl && (
                        <a
                            className={styles.linkText}
                            href={data.linkedinUrl}
                            data-cy={`${DataCyPrefix}LinkedinLink`}
                        >
                            Linkedin
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
};
export default Author;
