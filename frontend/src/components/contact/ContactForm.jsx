import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Grid, Paper } from '@mui/material';
import { Container } from 'react-bootstrap';

function ContactForm() {
  const { control, handleSubmit,reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // Handle form submission here
    console.log(data);
    alert("Form submitted successfully");
    reset()
  };

  return (
    <Container>
        <h2 className='text-center mt-4'>Keep in touch with us</h2>
      <Grid container spacing={3} className="my-5">
        <Grid item xs={12} md={6}>
          <Paper elevation={3} className="p-4" style={{ height: '100%' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Name is required' }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="name"
                        label="Name"
                        variant="outlined"
                        fullWidth
                        error={!!errors.name}
                        helperText={errors.name?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Email is required', pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ ]+$/, message: 'Email is not valid' } }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="email"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        error={!!errors.email}
                        helperText={errors.email?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="mobile"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Mobile number is required', pattern: { value: /^[0-9]{10}$/, message: 'Mobile number is not valid' } }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="mobile"
                        label="Mobile"
                        variant="outlined"
                        fullWidth
                        error={!!errors.mobile}
                        helperText={errors.mobile?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} className="p-4" style={{ height: '100%' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="message"
                control={control}
                defaultValue=""
                rules={{ required: 'Message is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="message"
                    label="Message"
                    variant="outlined"
                    multiline
                    rows={5}
                    fullWidth
                    error={!!errors.message}
                    helperText={errors.message?.message}
                  />
                )}
              />
              <Button type="submit" variant="outlined" color="primary" className="mt-4">
                Send Message
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ContactForm;
