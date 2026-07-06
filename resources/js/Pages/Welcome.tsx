type WelcomeProps = {
    appName: string;
    message: string;
};

export default function Welcome({ appName, message }: WelcomeProps) {
    return (
        <main style={{ maxWidth: '40rem', margin: '4rem auto', textAlign: 'center', fontFamily: 'system-ui' }}>
            <h1>{appName}</h1>
            <p>{message}</p>
            <p>Edit <code>resources/js/Pages/Welcome.tsx</code> and <code>routes/web.php</code>. POTANGENA</p>
        </main>
    );
}
