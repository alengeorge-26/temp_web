import style from './folderloadanimation.module.css'

const FolderLoadAnimation = () => {
    return (
        <iframe 
            id="loading"
            className={style.loading}
            title="Loading Frame"
            src="https://lottie.host/embed/66851556-4dbb-4ecd-9fcd-86695d264c25/P6cjA0yNKF.lottie"
        >
        </iframe>
    )
}

export default FolderLoadAnimation