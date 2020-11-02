import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles((theme) => ({
    paper: {
        padding: 20,
        boxShadow: '-1px 4px 20px -6px rgba(0, 0, 0, 0.2)'
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative'
        },
        '& .profile-image': {
            width: 200,
            height: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%'
        },
        '& .profile-details': {
            textAlign: 'center',
            '& span, svg': {
                verticalAlign: 'middle'
            },
            '& a': {
                color: theme.palette.primary.main
            }
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        }
    }
}));
