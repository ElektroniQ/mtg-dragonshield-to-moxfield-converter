import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Snackbar } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { DropzoneArea } from 'material-ui-dropzone';
import convert from './converter';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';

const ColorModeContext = React.createContext({ toggleColorMode: () => { console.log("mode") } });

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const CopyToClipboardButton = () => {
  const [open, setOpen] = React.useState(false)
  const handleClick = () => {
    setOpen(true);
    navigator.clipboard.writeText(window.location.toString());
  }
  
  return (
      <>
        <Button variant="contained" color="primary" sx={{ width: "98%", padding: 1, margin: '1%' }}
        onClick={handleClick}>Copy</Button>
        <Snackbar
          open={open}
          onClose={() => setOpen(false)}
          autoHideDuration={2000}
          message="Copied to clipboard"
        />
      </>
  )
}

function MyApp(props) {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const [csv, setCsv] = React.useState();
  const [txt, setTxt] = React.useState();

  const onChange = (e) => {
    const a = convert(e[0], setCsv, setTxt);
  }

  return (
    <Container component="main" >
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.default',
          color: 'text.primary',
          borderRadius: 1,
          p: 3,
        }}
      >
        {theme.palette.mode} mode
        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <DropzoneArea filesLimit={1} onChange={onChange} />
        <Grid container>
          <Grid item xs={6}>
            <Box sx={{ m: '2'}}>
            <CopyToClipboardButton/>
              <TextareaAutosize value={csv} readonly="readonly" minRows={40} style={{ whiteSpace: "pre-line", width: '98%', resize: 'vertical', overflow: 'auto', margin: "1%" }} />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ m: '2'}}>
            <CopyToClipboardButton/>
              <TextareaAutosize value={txt} readonly="readonly" minRows={40} style={{ whiteSpace: "pre-line", width: '98%', resize: 'vertical', overflow: 'auto', margin: "1%" }} />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>)
}


export default function ToggleColorMode() {
  const [mode, setMode] = React.useState('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
        components: {
          MuiDropzoneArea: {
            styleOverrides: {
              root: {
                backgroundColor: "green"
              }
            }
          },
          MuiDropzoneSnackbar: {
            errorAlert: {
              backgroundColor: "#FF0000",
              color: "#000"
            },
            successAlert: {
              backgroundColor: "#00FF00",
              color: "#000"
            },
          }
        }
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <MyApp />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
