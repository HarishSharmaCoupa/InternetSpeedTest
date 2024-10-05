module Api
    class InternetSpeedController < ApplicationController
        skip_before_action :verify_authenticity_token
        
       def create
        place = Place.create!(
            name: params[:place_name],
            city: params[:place_city],
            address: params[:place_city] # corrected from params[:place_city]
          )
          
          speed = InternetSpeed.create!(
            place: place,
            download_speed: params[:download_speed],
            download_units: params[:download_units]
          )

        render(json: { }, status: :created)
       end
    end
end
