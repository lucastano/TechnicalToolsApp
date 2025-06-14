import CircularProgress from '@mui/material/CircularProgress';

export const Loading = () => {
  return (
    <div className="fixed inset-0 bg-gray-50 opacity-25 z-50 flex items-center justify-center">
        <CircularProgress color="neutral" />
    </div>
     
  )
}
