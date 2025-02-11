module Api
    class PlacesController < ApplicationController
        skip_before_action :verify_authenticity_token
        

        def index   
            places = get_matching_places(search_term_param).map do |place|
            
                {
                    name: place.name,
                    city: place.city,
                    most_recent_download_speed: most_recent_download_speed(place),
                    most_recent_download_units: most_recent_download_units(place),
                    number_of_measurements: number_of_measurements(place)

                }
            end

            render(json: {places: places})

        end

        def most_recent_download_speed(place)
            place.internet_speeds.order("created_at").last&.download_speed
        end

        def most_recent_download_units(place)
            place.internet_speeds.order("created_at").last&.download_units
        end

        def number_of_measurements(place)
        end
        
        def get_matching_places(search_term)
            if search_term.blank?
                Place.all
            else
                
                Place.where("name LIKE ? OR city LIKE ?", "%#{search_term}%", "%#{search_term}%")

            end
        end

        def search_term_param
            params["search_term"]
        end
    end
end
