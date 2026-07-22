import { NoPhotosNotice, PhotoUploadForm, RemovePhotoButton } from './photo-manager';
import type { UploadFileMeta } from '../types';

/**
 * The broker's Photos tab, for one listing.
 *
 * A flat grid rather than the seller's hero-and-filmstrip: a broker is auditing the set
 * — is there anything here, is it the right unit, is the first one fit to be the card
 * image — not browsing it. The first tile is marked, because photos[0] is what the
 * marketplace card uses and that is not obvious from a grid.
 *
 * Its reason for existing is prosaic: photos routinely arrive as an email attachment
 * after the seller has already submitted the form. Before this tab there was nowhere to
 * put them, so the publish checklist's "at least one photo" could not be satisfied at
 * all without going back to the seller.
 */

type BrokerPhotosPanelProps = {
    photos: UploadFileMeta[];
    listingId: number;
    /** False on a Sold or Not Accepted listing, where the server closes the set. */
    editable: boolean;
    maxPhotos?: number;
};

export default function BrokerPhotosPanel({ photos, listingId, editable, maxPhotos }: BrokerPhotosPanelProps) {
    const baseUrl = `/broker/seller-submissions/${listingId}/photos`;

    return (
        <div className="grid gap-6">
            <section className="grid gap-3">
                <header className="flex items-center justify-between gap-3">
                    <h4 className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-700">
                        Photos
                    </h4>
                    <span className="text-xs text-neutral-500">
                        {photos.length} of {maxPhotos ?? 8}
                    </span>
                </header>

                {photos.length === 0 ? (
                    <NoPhotosNotice blocksPublishing />
                ) : (
                    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {photos.map((photo, index) => (
                            <li
                                key={photo.path}
                                className="relative overflow-hidden rounded-lg border border-[#dad5cb] bg-[#f3f1ec]"
                            >
                                <img
                                    src={photo.url}
                                    alt={photo.name}
                                    loading="lazy"
                                    className="aspect-[4/3] w-full object-cover"
                                />

                                {index === 0 && (
                                    // photos[0] is EquipmentSubmission::cardImageUrl(), i.e. the
                                    // image every marketplace card and search result shows.
                                    <span className="absolute left-2 top-2 rounded-full bg-[#a56437] px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.08em] text-white">
                                        Card image
                                    </span>
                                )}

                                {editable && (
                                    <div className="absolute right-2 top-2">
                                        <RemovePhotoButton
                                            action={`${baseUrl}/${index}`}
                                            label={`Remove ${photo.name}`}
                                        />
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            <PhotoUploadForm action={baseUrl} photoCount={photos.length} maxPhotos={maxPhotos} editable={editable} />
        </div>
    );
}
