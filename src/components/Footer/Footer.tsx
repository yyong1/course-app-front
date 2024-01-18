import { Box, Grid, Typography, Container, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import Logo from '../../assets/learnForge.svg';

const socialMediaLinks: { twitter: string; facebook: string; instagram: string } = {
  facebook: 'https://www.facebook.com/',
  twitter: 'https://twitter.com/',
  instagram: 'https://www.instagram.com/',
};

function Footer() {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        color: 'text.secondary',
        py: 3,
        borderTop: '1px solid',
        borderColor: 'divider',
        mt: 3,
      }}
    >
      <Container maxWidth={false}>
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item xs={12} sm={6} md={3}>
            {/*<Typography variant="h6" color="text.primary" gutterBottom>*/}
            {/*  LearnForge*/}
            {/*</Typography>*/}
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                mr: 1,
                p: 1,
                width: (theme) => theme.spacing(15),
                height: (theme) => theme.spacing(15),
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img src={Logo} alt="Your SVG" style={{ width: '100%', height: 'auto' }} />
            </Box>
          </Grid>
          {/*<Grid item xs={6} sm={3} md={2}>*/}
          {/*  <Typography variant="subtitle1" color="text.primary" gutterBottom>*/}
          {/*    PRODUCT*/}
          {/*  </Typography>*/}
          {/*  <Link href="#" color="inherit" display="block">*/}
          {/*    Features*/}
          {/*  </Link>*/}
          {/*  <Link href="#" color="inherit" display="block">*/}
          {/*    Integrations*/}
          {/*  </Link>*/}
          {/*  <Link href="#" color="inherit" display="block">*/}
          {/*    Pricing*/}
          {/*  </Link>*/}
          {/*  <Link href="#" color="inherit" display="block">*/}
          {/*    FAQ*/}
          {/*  </Link>*/}
          {/*</Grid>*/}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom>
              SOCIAL MEDIA
            </Typography>
            <IconButton aria-label="Facebook" color="inherit" component="a" href={socialMediaLinks.facebook}>
              <FacebookIcon />
            </IconButton>
            <IconButton aria-label="Twitter" color="inherit" component="a" href={socialMediaLinks.twitter}>
              <TwitterIcon />
            </IconButton>
            <IconButton aria-label="Instagram" color="inherit" component="a" href={socialMediaLinks.instagram}>
              <InstagramIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ pt: 4 }}>
          © 2024 Company Co. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
