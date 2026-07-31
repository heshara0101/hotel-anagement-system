document.addEventListener('DOMContentLoaded', () => {
    const bannerForm = document.getElementById('banner-form');

    if (bannerForm) {
        bannerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const headline = document.getElementById('headline').value;
            const subtitle = document.getElementById('subtitle').value;
            const bannerUrl = document.getElementById('banner-url').value;

            console.log('Saved CMS Data:', { headline, subtitle, bannerUrl });
            alert('Banner updated successfully!');
        });
    }
});